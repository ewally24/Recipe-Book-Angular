import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
	selector: '[dropdown]'
}) 

export class DropdownDirective {

	@HostBinding('class.open') get open() {
		return this.isOpened;
	}

	@HostListener('click') clickDropdown() {
		this.isOpened = true;
	}

	@HostListener('mouseleave') mouseleave() {
		this.isOpened = false;
	}

	private isOpened = false;

}