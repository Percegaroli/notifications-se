import { notificationsAPI } from "../../../config/notificationsAPI";

interface NotificationDTO {
  id: string;
  userEmail: string;
  createdAt: Date;
  readAt: Date;
  title: string;
  message: string;
}

export const getNotifications = (email: string) =>
  notificationsAPI.get<Array<NotificationDTO>>(`/notifications/${email}`);
