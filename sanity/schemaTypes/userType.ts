import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  title: "Users",
  type: "document",
  fields: [
    defineField({
      name: "clerkId",
      title: "Clerk User ID",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "addresses",
      title: "Addresses",
      type: "array",
      of: [{ type: "address" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "email",
      media: "profileImage",
    },
  },
});