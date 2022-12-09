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

defineTask(LISTEN_TO_NOTIFICATIONS_TASK_NAME, async () => {
  try {
    const notificationsResponse = await getNotifications(
      UserSingleton.getInstance().getEmail()
    );
    if (notificationsResponse.data.length) {
      //Mapear os dados da notificação para exibir
      await scheduleNotificationAsync({
        content: {
          title: "Exemplo de título",
          body: "Exemplo de corpo",
        },
        trigger: { seconds: 1 },
      });
    }
    return BackgroundFetchResult.NewData;
  } catch {
    return BackgroundFetchResult.Failed;
  }
});

export const registerBackgroundFetch = () =>
  registerTaskAsync(LISTEN_TO_NOTIFICATIONS_TASK_NAME, {
    minimumInterval: 6,
  });

export const unregisterBackgroundFetch = () =>
  unregisterTaskAsync(LISTEN_TO_NOTIFICATIONS_TASK_NAME);
