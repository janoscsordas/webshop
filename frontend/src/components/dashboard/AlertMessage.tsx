import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


function AlertMessage(props: any) {

    return (
        <Alert variant={props.variant || "default"} className={props.className || ""}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{props.Title}</AlertTitle>
            <AlertDescription>
                {props.message}
            </AlertDescription>
        </Alert>
    )
}

export default AlertMessage