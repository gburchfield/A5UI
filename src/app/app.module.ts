import { AlisProductResolver } from './components/process/alis-product/alis-product-resolver.service';
import {
    ExecutionAssetDetailsResolver,
} from './components/production/execution/execution-asset/asset-details-resolver.service';
import { ExecutionAssetResolver } from './components/production/execution/execution-kit/asset-resolver.service';
import { ExecutionService } from './components/production/execution/execution.service';
import { ExecutionKitResolver } from './components/production/execution/execution-kit-list/kit-resolver.service';
import { AlisProductService } from './components/process/alis-product/alis-product.service';
import { CustomersService } from './components/production/customers/customers.service';
import { ContractKitResolver } from './components/production/contracts/contract-kit-resolver.service';
import { ContractResolver } from './components/production/contracts/contract-resolver.service';
import { ContractsService } from './components/production/contracts/contracts.service';
import { ContractsResolver } from './components/production/contracts/contracts-resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
import { HeaderComponent } from './header/header.component';
import { CountriesListComponent } from './components/enterprise/location/navigation/countries-list/countries-list.component';
import { CountryItemComponent } from './components/enterprise/location/navigation/countries-list/country-item/country-item.component';
import { LocationsListComponent } from './components/enterprise/location/navigation/locations-list/locations-list.component';
import { LocationItemComponent } from './components/enterprise/location/navigation/locations-list/location-item/location-item.component';
import { NodesListComponent } from './components/enterprise/location/navigation/nodes-list/nodes-list.component';
import { NodeItemComponent } from './components/enterprise/location/navigation/nodes-list/node-item/node-item.component';
import { AssetListComponent } from './components/enterprise/location/asset-list/asset-list.component';
import { AssetItemComponent } from './components/enterprise/location/asset-list/asset-item/asset-item.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { NavigationComponent } from './components/enterprise/location/navigation/navigation.component';
import { MenuComponent } from './menu/menu.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './components/enterprise/location/location.component';
import { ProcessComponent } from './components/process/process.component';
import { AlisProductComponent } from './components/process/alis-product/alis-product.component';
import { AlisProductListComponent } from './components/process/alis-product/alis-product-list/alis-product-list.component';
import { AlisProductDetailComponent } from './components/process/alis-product/alis-product-detail/alis-product-detail.component';
import { AlisProductEditComponent } from './components/process/alis-product/alis-product-edit/alis-product-edit.component';
import { AlisProductStartComponent } from './components/process/alis-product/alis-product-start/alis-product-start.component';
import { ProcessHomeComponent } from './components/process/process-home/process-home.component';
import { ProductionComponent } from './components/production/production.component';
import { ContractsComponent } from './components/production/contracts/contracts.component';
import { ContractsStartComponent } from './components/production/contracts/contracts-start/contracts-start.component';
import { ContractsListComponent } from './components/production/contracts/contracts-list/contracts-list.component';
import { ContractsDetailComponent } from './components/production/contracts/contracts-detail/contracts-detail.component';
import { ContractsEditComponent } from './components/production/contracts/contracts-edit/contracts-edit.component';
import { CustomersComponent } from './components/production/customers/customers.component';
import { CustomersListComponent } from './components/production/customers/customers-list/customers-list.component';
import { CustomersDetailComponent } from './components/production/customers/customers-detail/customers-detail.component';
import { CustomersEditComponent } from './components/production/customers/customers-edit/customers-edit.component';
import { CustomersStartComponent } from './components/production/customers/customers-start/customers-start.component';
import { CustomersLocationsEditComponent } from './components/production/customers/customers-locations-edit/customers-locations-edit.component';
import { CustomersLocationsEditListComponent } from './components/production/customers/customers-locations-edit/customers-locations-edit-list/customers-locations-edit-list.component';
import { CustomersLocationsEditLocationComponent } from './components/production/customers/customers-locations-edit/customers-locations-edit-location/customers-locations-edit-location.component';
import { ContractsKitsComponent } from './components/production/contracts/contracts-kits/contracts-kits.component';
import { KitsListComponent } from './components/production/contracts/contracts-kits/kits-list/kits-list.component';
import { KitsEditComponent } from './components/production/contracts/contracts-kits/kits-edit/kits-edit.component';
import { KitsDetailComponent } from './components/production/contracts/contracts-kits/kits-detail/kits-detail.component';
import { KitsNewComponent } from './components/production/contracts/contracts-kits/kits-new/kits-new.component';
import { AssetsDetailComponent } from './components/production/contracts/contracts-assets/assets-detail/assets-detail.component';
import { AssetsEditComponent } from './components/production/contracts/contracts-assets/assets-edit/assets-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarDirective } from './directives/navbar.directive';
import { ExecutionComponent } from './components/production/execution/execution.component';
import { ExecutionKitComponent } from './components/production/execution/execution-kit/execution-kit.component';
import { ExecutionKitListComponent } from './components/production/execution/execution-kit-list/execution-kit-list.component';
import { ExecutionAssetComponent } from './components/production/execution/execution-asset/execution-asset.component';
import { ExecutionPhaseComponent } from './components/production/execution/execution-phase/execution-phase.component';
import { NodenameEditComponent } from './components/production/execution/execution-kit/nodename-edit/nodename-edit.component';
import { ProcessExecutionComponent } from './components/process/process-execution/process-execution.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountriesListComponent,
    CountryItemComponent,
    LocationsListComponent,
    LocationItemComponent,
    NodesListComponent,
    NodeItemComponent,
    AssetListComponent,
    AssetItemComponent,
    EnterpriseComponent,
    NavigationComponent,
    MenuComponent,
    MenuListComponent,
    BodyComponent,
    HomeComponent,
    LocationComponent,
    ProcessComponent,
    AlisProductComponent,
    AlisProductListComponent,
    AlisProductDetailComponent,
    AlisProductEditComponent,
    AlisProductStartComponent,
    ProcessHomeComponent,
    ProductionComponent,
    ContractsComponent,
    ContractsStartComponent,
    ContractsListComponent,
    ContractsDetailComponent,
    ContractsEditComponent,
    CustomersComponent,
    CustomersListComponent,
    CustomersDetailComponent,
    CustomersEditComponent,
    CustomersStartComponent,
    CustomersLocationsEditComponent,
    CustomersLocationsEditListComponent,
    CustomersLocationsEditLocationComponent,
    ContractsKitsComponent,
    KitsListComponent,
    KitsEditComponent,
    KitsDetailComponent,
    KitsNewComponent,
    AssetsDetailComponent,
    AssetsEditComponent,
    NavbarDirective,
    ExecutionComponent,
    ExecutionKitComponent,
    ExecutionKitListComponent,
    ExecutionAssetComponent,
    ExecutionPhaseComponent,
    NodenameEditComponent,
    ProcessExecutionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [AppService, ContractsResolver, ContractResolver, ContractKitResolver, ContractsService, CustomersService, AlisProductService, AlisProductResolver, ExecutionKitResolver, ExecutionAssetResolver, ExecutionAssetDetailsResolver, ExecutionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
