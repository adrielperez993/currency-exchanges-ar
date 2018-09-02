import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, isDevMode } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  title = 'Currency Exchanges AR';
  mediaImgPath = './assets/media-icons/';
  logoImgMobile = './assets/icons/ES2x.png';
  logoImg = './assets/icons/TodaysCurrencyExchanges.png';

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              updates: SwUpdate) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });

    if (isDevMode()) {
      this.mediaImgPath = '../../../assets/media-icons/';
      this.logoImgMobile = '../../../assets/icons/ES.png';
      this.logoImg = '../../../assets/icons/TodaysCurrencyExchanges.png';
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  refresh() {
    location.reload();
  }
}
