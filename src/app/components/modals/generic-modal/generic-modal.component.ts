import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "br-modal",
  templateUrl: "./generic-modal.component.html",
  styleUrls: ["./generic-modal.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class GenericModalComkponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.modalService.add(this);
    document.body.appendChild(this.element);

    this.element.addEventListener("click", (el: any) => {
      if (el.target.className === "br-modal") {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.modalService.remove(this);
    this.element.remove();
  }

  open() {
    this.element.style.display = "block";
    document.body.classList.add("br-modal-open");
    this.isOpen = true;
  }

  close() {
    this.element.style.display = "none";
    document.body.classList.remove("br-modal-open");
    this.isOpen = false;
  }
}
