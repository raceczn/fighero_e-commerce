import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// app/api/addresses/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming data:", body);

    const { name, address, barangay, city, province, zip, isDefault, userId } = body;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // First, find the Sanity user document
    const userQuery = `*[_type == "user" && clerkId == $clerkId][0]{
      _id,
      addresses[]->{_id}
    }`;
    const user = await client.fetch(userQuery, { clerkId: userId });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const sanityUserId = user._id;

    // If this is a default address, unset all other defaults
    if (isDefault) {
      try {
        // Find all addresses for this user that are marked as default
        const defaultAddressesQuery = `*[_type == "address" && user._ref == $userId && isDefault == true]`;
        const defaultAddresses = await client.fetch(defaultAddressesQuery, { userId: sanityUserId });

        // Update each default address to set isDefault to false
        await Promise.all(
          defaultAddresses.map((addr: any) =>
            client.patch(addr._id).set({ isDefault: false }).commit()
          )
        );
      } catch (error) {
        console.error("Error unsetting default addresses:", error);
      }
    }

    // Create the new address
    const newAddress = {
      _type: "address",
      name,
      address,
      barangay,
      city,
      province,
      zip,
      isDefault: Boolean(isDefault),
      user: {
        _type: "reference",
        _ref: sanityUserId,
      },
    };

    const createdAddress = await client.create(newAddress);

    // Update the user document to include the new address reference
    try {
      await client
        .patch(sanityUserId)
        .setIfMissing({ addresses: [] })
        .append("addresses", [
          {
            _type: "reference",
            _ref: createdAddress._id,
            _key: createdAddress._id, // Add a unique key
          },
        ])
        .commit();
    } catch (patchError) {
      console.error("Error updating user addresses:", patchError);
      // Clean up the created address if the update fails
      await client.delete(createdAddress._id);
      throw patchError;
    }

    return NextResponse.json(createdAddress, { status: 201 });

  } catch (error: any) {
    console.error("API error creating address:", error);
    return NextResponse.json(
      {
        message: "Failed to create address",
        details: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
      },
      { status: 500 }
    );
  }
}
