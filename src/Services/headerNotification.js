import { NotificationManager } from "react-notifications";


export default function createHeaderNotification(type, message, title) {
    switch(type){
        case "info":{
            NotificationManager.info(message, title, 10000);
            break;
        }
        case "warning":{
            NotificationManager.warning(message, title, 10000);
            break;
        }
        case "success":{
            NotificationManager.success(message, title, 10000);
            break;
        }
        case "error":{
            NotificationManager.error(message, title, 10000);
            break;
        }
    }
}
