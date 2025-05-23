'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { customDocumentActions } from './sanity/plugins/customDocumentActions'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes' // Fixed import path
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  schema,
  title: 'Admin Panel',
  plugins: [
    structureTool({
      structure,
      title: 'Admin Panel',
      name: 'dashboard',
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    actions: (prev, { schemaType }) => {
      // You can add conditional logic here if needed
      // For example, only modify actions for specific schema types
      return customDocumentActions(prev)
    }
  },
})