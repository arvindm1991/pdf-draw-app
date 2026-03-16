import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare var fabric: any;
import 'fabric';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <div class="toolbar">
        <button (click)="toggleDrawing()" [class.active]="isDrawing">
          <span class="icon">✏️</span>
          Drawing Tool
        </button>
      </div>
      <div class="viewer-container">
        <!-- PDF Layer -->
        <div class="pdf-layer">
          <iframe 
            src="https://docs.google.com/viewer?url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf&embedded=true" 
            width="100%" 
            height="100%" 
            frameborder="0">
          </iframe>
        </div>
        <!-- Canvas Layer -->
        <canvas #canvasElement id="canvas"></canvas>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .toolbar {
      width: 100px;
      background: #2c3e50;
      display: flex;
      flex-direction: column;
      padding: 10px;
      gap: 10px;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
      z-index: 10;
    }
    .toolbar button {
      background: #34495e;
      border: none;
      color: white;
      padding: 15px 5px;
      cursor: pointer;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: background 0.3s;
      font-size: 12px;
    }
    .toolbar button:hover {
      background: #1abc9c;
    }
    .toolbar button.active {
      background: #1abc9c;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
    .viewer-container {
      flex: 1;
      position: relative;
      background: #ecf0f1;
      overflow: hidden;
    }
    .pdf-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    /* Fabric.js wrapper styling */
    ::ng-deep .canvas-container {
      position: absolute !important;
      top: 0;
      left: 0;
      z-index: 2;
    }
  `]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  private canvas!: fabric.Canvas;
  isDrawing = false;

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      width: window.innerWidth - 100, // Account for toolbar
      height: window.innerHeight,
      isDrawingMode: false
    });

    // Set drawing brush properties
    this.canvas.freeDrawingBrush.width = 5;
    this.canvas.freeDrawingBrush.color = 'red';

    window.addEventListener('resize', () => {
      this.canvas.setDimensions({
        width: window.innerWidth - 100,
        height: window.innerHeight
      });
    });
  }

  toggleDrawing() {
    this.isDrawing = !this.isDrawing;
    this.canvas.isDrawingMode = this.isDrawing;
  }
}
