import {Component, Inject, HostListener, HostBinding} from '@angular/core';
import { Config, EnvConfig } from '../config/env.config';
import { WindowRefService } from '../window-ref.service';
import { SmoothScrollService } from '../smoothscroll/smoothscroll.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {

  private readonly window: Window;
  public readonly config : EnvConfig = Config;

  // How long to scroll until the initialState class gets removed
  private readonly offset:number = 50;

  // Variable used in view for CSS class
  public initialState: boolean = true;
  public menuOpened = false;

  public navOffsetHeight = 0;

  constructor(windowRef: WindowRefService, private smoothscroll: SmoothScrollService) {
    this.window = windowRef.nativeWindow;
  }

  /**
   * Listen for scroll event and set 'initialState' CSS class in template if offset exceeded
   */
@HostListener('window:scroll', [])​​​
    onScroll() {
      this.initialState = !(this.window.pageYOffset > this.offset);
    }

  public handleClick(event:Event, anchor:any) {
    this.menuOpened = false;
    event.preventDefault();
    // locate the id to be scrolled to
    this.smoothscroll.smoothScrollToAnchor(anchor);
  }

  public scrollToTop() {
      this.menuOpened = false;
      this.smoothscroll.smoothScrollToTop();
  }
}
