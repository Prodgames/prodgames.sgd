import { Injectable } from "@angular/core";
import { GenericModalComkponent } from "../components/modals/generic-modal/generic-modal.component";

@Injectable({ providedIn: "root" })
export class ModalService {
  private modals: GenericModalComkponent[] = [];

  add(modal: GenericModalComkponent) {
    if (!modal.id || this.modals.find((x) => x.id === modal.id)) {
      throw new Error("modal must have a unique id attribute");
    }

    this.modals.push(modal);
  }

  remove(modal: GenericModalComkponent) {
    this.modals = this.modals.filter((x) => x === modal);
  }

  open(id: string) {
    const modal = this.modals.find((x) => x.id === id);

    if (!modal) {
      throw new Error(`Modal '${id}' not found`);
    }

    modal.open();
  }

  close() {
    const modal = this.modals.find((x) => x.isOpen);
    modal?.close();
  }
}
