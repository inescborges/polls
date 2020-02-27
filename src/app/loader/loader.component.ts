import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loadingOK = false;
  showContent = false;
  loadingSubscription: Subscription;
  constructor(private http: HttpClient, private loaderService: LoaderService){ }
  ngOnInit() {
    this.loadingSubscription = this.loaderService.isLoading.subscribe((value) => {
      this.loadingOK = value;
    });
    this.callApi();
  }
  
  callApi() {
    this.http.get('https://private-anon-f4b8190d8a-blissrecruitmentapi.apiary-mock.com/health')
    .subscribe(data => {
        if(data.hasOwnProperty('status')) {
          if(data['status'] === 'OK') {
            this.showContent = true;
          }
        }
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}