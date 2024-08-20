import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ThemeProvider } from '@/components/Theme-Provider'
import { AdminUserProvider } from '@/context/AdminUserContext'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { ToastProvider } from '@/components/ui/toast'
import { UserProvider } from '@/context/UserContext'
import { Toaster } from '@/components/ui/toaster'

export const Route = createRootRoute({
  component: () => (
    <>
      <AdminUserProvider>
        <UserProvider>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <TooltipProvider>
                    <ToastProvider>
                        <Toaster />
                        <Outlet />
                    </ToastProvider>
                </TooltipProvider>
            </ThemeProvider>
        </UserProvider>
      </AdminUserProvider>
    </>
  ),
})
