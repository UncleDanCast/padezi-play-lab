import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex flex-col space-y-1">
              {title && (
                <div>
                  <ToastTitle>{title}</ToastTitle>
                  {/* Extract English translation from title if present */}
                  {typeof title === 'string' && title.includes('!') && (
                    <div className="text-fluid-sm font-medium opacity-60 mt-0.5">
                      {title === "Vrijeme je isteklo!" && "Time's up!"}
                      {title === "Točno!" && "Correct!"}
                      {title === "Netočno!" && "Incorrect!"}
                    </div>
                  )}
                </div>
              )}
              {description && (
                <div>
                  {/* Split description by double newline to separate Croatian and English */}
                  {typeof description === 'string' && description.includes('\n\n') ? (
                    description.split('\n\n').map((part, index) => (
                      <ToastDescription 
                        key={index} 
                        className={index > 0 ? "text-fluid-xs opacity-50 mt-1" : ""}
                      >
                        {part}
                      </ToastDescription>
                    ))
                  ) : (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
