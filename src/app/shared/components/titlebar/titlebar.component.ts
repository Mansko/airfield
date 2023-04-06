import { Component, Input, OnInit } from '@angular/core';
import { WindowService } from '../../services/window/window.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css'],
})
export class TitlebarComponent implements OnInit {
  @Input() public hasIcon: boolean = false;
  @Input() public hasSaveIndicator: boolean = false;
  @Input() public title: string | undefined = undefined;
  @Input() public hasFileFunctions: boolean = false;
  @Input() public newProjectCallback: Function | undefined = undefined;
  @Input() public openProjectCallback: Function | undefined = undefined;
  @Input() public openRecentCallback: Function | undefined = undefined;
  @Input() public saveProjectCallback: Function | undefined = undefined;
  @Input() public saveProjectAsCallback: Function | undefined = undefined;
  @Input() public hasEditFunctions: boolean = false;
  @Input() public undoCallback: Function | undefined = undefined;
  @Input() public redoCallback: Function | undefined = undefined;
  @Input() public hasHelpFunctions: boolean = false;
  @Input() public releaseNotesCallback: Function | undefined = undefined;

  constructor(private window: WindowService) {}

  public ngOnInit(): void {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.handleWindowsControls();
      }
    };
  }

  public handleWindowsControls() {
    document.getElementById('new-project')?.addEventListener('click', () => {
      // this.newProjectCallback();
    });
    document.getElementById('open-project')?.addEventListener('click', () => {
      // this.openProjectCallback();
    });
    document.getElementById('open-recent')?.addEventListener('click', () => {
      // this.openRecentCallback();
    });
    document.getElementById('new-project')?.addEventListener('click', () => {
      // this.newProjectCallback();
    });
    document.getElementById('save')?.addEventListener('click', () => {
      // this.saveProjectCallback();
    });
    document.getElementById('save-as')?.addEventListener('click', () => {
      // this.saveProjectAsCallback();
    });
    document.getElementById('exit')?.addEventListener('click', () => {
      this.window.closeWindow();
    });
    document.getElementById('undo')?.addEventListener('click', () => {
      // this.undoCallback();
    });
    document.getElementById('redo')?.addEventListener('click', () => {
      // this.redoCallback();
    });

    document.getElementById('release-notes')?.addEventListener('click', () => {
      // this.releaseNotesCallback();
    });
    document
      .getElementById('toggle-dev-tools')
      ?.addEventListener('click', () => {
        // this.window.toggleDevTools();
      });

    document.getElementById('about')?.addEventListener('click', () => {
      // this.ipc.send('dialog:about');
    });

    document.getElementById('min-button')?.addEventListener('click', () => {
      this.window.minimize();
    });

    document.getElementById('max-button')?.addEventListener('click', () => {
      this.window.maximize();
    });

    document.getElementById('restore-button')?.addEventListener('click', () => {
      this.window.restore();
    });

    document.getElementById('close-button')?.addEventListener('click', () => {
      this.window.closeWindow();
    });

    this.window.onMaximize(() => {
      document.getElementById('titlebar')?.classList.add('maximized');
    });
    this.window.onMinimize(() => {
      document.getElementById('titlebar')?.classList.remove('maximized');
    });
  }
}
