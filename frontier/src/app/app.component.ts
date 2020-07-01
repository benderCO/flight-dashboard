import { Component, OnInit } from '@angular/core';
import { AccountsServiceService } from 'src/services/accounts-service.service';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'frontier';
  public activeAccounts: [] = [];
  public overdueAccounts: [] = [];
  public inactiveAccounts: [] = [];

  constructor(
    private accountsServiceService: AccountsServiceService
  ) {}

  ngOnInit() {
    console.log('HEY LISTEN');
    this.accountsServiceService.loadAllAccounts().pipe(
      tap((resp: []) => {
        console.log('Responses are: ', resp);
        var currDate = new Date();
        currDate.setMonth(currDate.getMonth() + 1);
        this.activeAccounts = resp.filter((item: any) => item.PaymentDueDate < currDate) as any;
        this.overdueAccounts = resp.filter((item: any) => item.PaymentDueDate >= currDate) as any;
        this.inactiveAccounts = resp.filter((item: any) => item.PaymentDueDate == null) as any;
      })
    ).subscribe();
  }
}
