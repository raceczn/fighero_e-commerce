import type { StructureResolver } from 'sanity/structure'
import { DocumentIcon } from '@sanity/icons'
import DashboardPage from './dashboard/DashboardPage' // your custom React component

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // ✅ Dashboard custom view
      S.listItem()
        .title('Dashboard')
        .icon(DocumentIcon)
        .child(
          S.component()
            .id('dashboard')
            .title('Admin Dashboard')
            .component(DashboardPage)
        ),

      // ✅ All other document types
      ...S.documentTypeListItems(),
    ])
