import {SmoothScrollService} from '../smoothscroll/smoothscroll.service';

/**
 * Base class that all sections on the candely page
 * inherit from.
 *
 * @export
 * @class SectionBase
 */
export abstract class SectionBase {
    private readonly smoothscroll: any;

    sectionName: 'base';
    sectionUrl: 'base';

    // Url logic should go here

    /**
     * constructor to inject smoothScrollService into base
     * @param smoothscroll
     */
    constructor(smoothscroll: SmoothScrollService) {
        this.smoothscroll = smoothscroll;
    }

    /**
     * trigger smoothScrollService to scroll to "Konfigurator"
     */
    public goToConfigurator(): void {
        this.smoothscroll.smoothScrollToAnchor('#konfigurator');
    }

    /**
     * trigger smoothScrollService to scroll to next section-sibling in DOM
     * @param event
     */
    public goToNextPage(event: Event): void {
        this.smoothscroll.smoothScrollToNextSection(event);
    }
}
