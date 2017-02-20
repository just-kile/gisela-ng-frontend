import { Injectable, Input } from '@angular/core';
import { WindowRefService } from '../window-ref.service';

declare const smoothScroll: any;

@Injectable()
export class SmoothScrollService {
  private readonly window: Window;
  // header defaults to <nav>
  private _fixedHeaderRef: string = 'nav';

  // inject window-Reference to manipulate the viewport
  constructor(windowRef: WindowRefService) {
    this.window = windowRef.nativeWindow;
  }

  /** smooth scroll to given anchorID or localName
   * @param anchorID
   */
  smoothScrollToAnchor(anchorID: any) {
    let anchor = this.getElementReference(anchorID);
    let offset = this.getFixedHeaderOffset();
    if (anchor && offset) {
      smoothScroll.animateScroll(anchor, null, {offset: offset});
    } else {
      console.log('[smoothScroll] can not scroll to provided anchor');
      return;
    }
  }

  /** smooth scroll to next section relatively from position click was triggered
   * @param clickEvent
   */
  smoothScrollToNextSection(clickEvent: any) {
    let section = this.findNextSection(clickEvent);
    this.smoothScrollToAnchor(section);
  }

  /**
   * smooth scroll to top of page, regardless where the view currently is
   */
  smoothScrollToTop() {
    smoothScroll.animateScroll(0);
  }

  /* HELPERS */
  /**
   * setter for header reference element
   * @param elementRef
   */
  @Input('fixedHeaderRef')
  set fixedHeaderRef(elementRef: string) {
    this._fixedHeaderRef = elementRef;
  }

  /**
   * return HTML element reference for given anchor
   * @param anchorID
   * @returns {any}
   */
  private getElementReference(anchorID: string) {
    let anchorTo = this.window.document.querySelector(anchorID);
    if (anchorTo) {
      return anchorTo;
    } else {
      console.log('[smoothScroll] provided anchor does not exist: ' + anchorID);
      return null;
    }
  }

  /**
   * return offset for set header reference
   * @returns {number}
   */
  private getFixedHeaderOffset() {
    let result = this.window.document.querySelector(this._fixedHeaderRef).clientHeight;
    // so far we distinguish between three <nav> heights:
    // * (1) mobile: 50px (fixed, trustbar is not visible)
    // * (2) desktop: 70px (fixed, when trustbar is not visible. here: "scrolled into the document")
    // * (3) desktop: >70px (dynamic, when trustbar is visible. here: "scrolled to top of page").
    // Before smoothScrolling in the page, we have to pre-define the offset of the fixed header (here: <nav>), so
    // that smoothScrolling does not scroll to far.
    // As we are not able to determine what height the nav-bar will have after we scroll into the view
    // (the <nav> will change(3), namely "hide the trustbar", after scrolling 100px into the view) we have to hardcode
    // the expected height of the <nav> (2), in case the <nav> (3) height is higher than the actual height, when
    // scrolled 100px into the view. This will be the height of <nav> without the trustbar (2).
    if (result > 70) {
      result = 70;
    }
    return result;
  }

  /**
   * find the next section based on where the click-event happend
   * takes sd-home as reference and its children as "section"
   * @param event
   * @returns {null}
   */
  private findNextSection(event: any) {
    // return traversalPath of the clicked element up until window.document.body
    let traversalPath = this.handleClicks(event);

    // find the position of the section where the click was triggered in the view
    let pathIndex = traversalPath.findIndex(this.isRootSelector);
    let nextSection:string = null;

    // return the name of the section following after the section where the click was triggered
    if (pathIndex > -1 && traversalPath[pathIndex - 1].nextElementSibling) {
      nextSection = traversalPath[pathIndex - 1].nextElementSibling.localName;
    } else {
      return null;
    }

    // return the resulting section selector
    if (nextSection) {
      return nextSection;
    } else {
      return null;
    }
  }

  /**
   * define, that all sections are children from <sd-home>
   * @param element
   * @returns {boolean}
   */
  private isRootSelector(element: any) {
    return element.localName === 'sd-home';
  }

  /**
   * return path traversal of clicked element
   * @param event
   * @returns {Array}
   */
  private handleClicks(event: Event) {
    let path: any = [];
    let node: any = event.target;
    while (node != this.window.document.body) {
      path.push(node);
      node = node.parentNode;
    }
    return path;
  }
}
