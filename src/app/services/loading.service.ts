import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, inject } from "@angular/core";
import { LoadingSpinnerComponent } from "../components/common/loading-spinner/loading-spinner.component";

@Injectable({
    providedIn: "root",
})
export class LoadingService {
    private overlayRef!: OverlayRef;

    #overlay = inject(Overlay);

    public show() {
        this.overlayRef = this.#overlay.create({
            hasBackdrop: true,
            backdropClass: "dark-backdrop",
        });

        const spinnerPortal = new ComponentPortal(LoadingSpinnerComponent);
        this.overlayRef.attach(spinnerPortal);
    }

    public hide() {
        if (this.overlayRef) this.overlayRef.detach();
    }
}
