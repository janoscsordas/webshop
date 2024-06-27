import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '@/components/Theme-Provider'
import { AdminUserProvider } from '@/context/AdminUserContext'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { ToastProvider } from '@/components/ui/toast'

export const Route = createRootRoute({
  component: () => (
    <>
      <AdminUserProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <TooltipProvider>
            <ToastProvider>
              <Outlet />
            </ToastProvider>
          </TooltipProvider>
        </ThemeProvider>
      </AdminUserProvider>
    </>
  ),
})
