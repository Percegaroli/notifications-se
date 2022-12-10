import {
  BackgroundFetchResult,
  registerTaskAsync,
  unregisterTaskAsync,
} from "expo-background-fetch";
import { scheduleNotificationAsync } from "expo-notifications";
import { defineTask } from "expo-task-manager";
import { getNotifications } from "../../api/notifications/getNotifications";
import { UserSingleton } from "../../singletons/UserSingleton";

const LISTEN_TO_NOTIFICATIONS_TASK_NAME = "listen_to_notifications_task_name";

/*
defineTask(LISTEN_TO_NOTIFICATIONS_TASK_NAME, async () => {
  try {
    console.log("fazendo requisição");
    console.log(UserSingleton.getInstance().getEmail());
    const notificationsResponse = await getNotifications(
      UserSingleton.getInstance().getEmail()
    );
    console.log(notificationsResponse.data);
    if (notificationsResponse.data.length) {
      await Promise.allSettled(
        notificationsResponse.data.map(({ message, title }) => {
          return scheduleNotificationAsync({
            content: {
              title: title,
              body: message,
            },
            trigger: { seconds: 1 },
          });
        })
      );
    }
    return BackgroundFetchResult.NewData;
  } catch {
    return BackgroundFetchResult.Failed;
  }
});
*/

defineTask(LISTEN_TO_NOTIFICATIONS_TASK_NAME, () => {
  console.log("fazendo requisição");
  console.log(UserSingleton.getInstance().getEmail());
  getNotifications(UserSingleton.getInstance().getEmail())
    .then((notificationsResponse) => {
      console.log(notificationsResponse.data);
      if (notificationsResponse.data.length) {
        Promise.allSettled(
          notificationsResponse.data.map(({ message, title }) => {
            return scheduleNotificationAsync({
              content: {
                title: title,
                body: message,
              },
              trigger: { seconds: 1 },
            });
          })
        );
      }
    })
    .then(() => BackgroundFetchResult.NewData)
    .catch(() => BackgroundFetchResult.Failed);
});

export const registerBackgroundFetch = () =>
  registerTaskAsync(LISTEN_TO_NOTIFICATIONS_TASK_NAME, {
    minimumInterval: 6,
  });

export const unregisterBackgroundFetch = () =>
  unregisterTaskAsync(LISTEN_TO_NOTIFICATIONS_TASK_NAME);
