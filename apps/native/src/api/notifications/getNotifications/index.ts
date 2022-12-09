import { notificationsAPI } from "../../../config/notificationsAPI";

interface NotificationDTO {
  title: string;
  body: string;
}

export const getNotifications = (email: string) =>
  notificationsAPI.get<Array<NotificationDTO>>(`/notifications/${email}`);
