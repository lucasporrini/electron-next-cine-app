import { cn, convertDate } from "@/lib/utils";
import { BellIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useNotifications } from "../providers/notifications-provider";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type Notifications = {
  title: string;
  description: string;
  isRead: boolean;
  date: string;
};

export const Notifications = () => {
  const { notifications, setNotifications } = useNotifications();

  useEffect(() => {
    setNotifications(
      localStorage.getItem("notifications")
        ? JSON.parse(localStorage.getItem("notifications") || "[]")
        : []
    );
  }, [setNotifications]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative p-0 rounded-full aspect-square">
          <BellIcon size={18} />
          {notifications.filter((notification) => notification.isRead === false)
            .length > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center p-1 bg-red-600 rounded-full translate-x-1/3 size-4 aspect-square">
              {notifications.filter((n) => n.isRead === false).length > 9 ? (
                <span className="text-xs">9+</span>
              ) : (
                notifications
                  .filter((n) => n.isRead === false)
                  .length.toString()
              )}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 text-white min-w-[500px] max-h-[500px] overflow-y-scroll">
        <div className="flex flex-col">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start justify-between py-2 px-4 hover:bg-primary cursor-default",
                index >= 1 && "border-t border-primary",
                notification.isRead && "opacity-50"
              )}
              // changer le boolean isRead au hover
              onMouseLeave={() => {
                setNotifications(
                  notifications.map((n, i) =>
                    i === index ? { ...n, isRead: true } : n
                  )
                );
                // Marquer en isRead true dans le localStorage
                localStorage.setItem(
                  "notifications",
                  JSON.stringify(
                    notifications.map((n, i) =>
                      i === index ? { ...n, isRead: true } : n
                    )
                  )
                );
              }}
            >
              <div className="flex flex-col items-start gap-2 min-w-fit">
                <span className="font-semibold text-md">
                  {notification.title}
                </span>
                <span className="text-sm">{notification.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 min-w-fit">
                  {convertDate(notification.date)}
                </span>
                <XIcon
                  size={20}
                  className="cursor-pointer"
                  onClick={() => {
                    setNotifications(
                      notifications.filter((n, i) => i !== index)
                    );
                    // Supprimer la notification du localStorage
                    localStorage.setItem(
                      "notifications",
                      JSON.stringify(
                        notifications.filter((n, i) => i !== index)
                      )
                    );
                  }}
                />
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="flex items-center justify-center p-4">
              <span className="text-sm">Aucune notification</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
