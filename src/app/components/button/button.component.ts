import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ required: true }) text: string;
  @Input({ required: true }) type: string;
  @Output() click = new EventEmitter<void>();

  constructor() {
    this.text = '';
    this.type = '';
  }

  handleOnClick(): void {
    this.click.emit();
  }
}
