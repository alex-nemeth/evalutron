import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertType } from "../enums/alert-type.enum";

@Injectable({
    providedIn: "root",
})
export class AlertService {
    #snackBar = inject(MatSnackBar);

    showAlert(
        message: string,
        type: AlertType = AlertType.Primary,
        durationInSeconds: number = 5000
    ) {
        this.#snackBar.open(message, "✖", {
            duration: durationInSeconds * 1000,
            panelClass: [type],
        });
    }
}
