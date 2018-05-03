import { ProcessExecutionComponent } from './components/process/process-execution/process-execution.component';
import {
    NodenameEditComponent,
} from './components/production/execution/execution-kit/nodename-edit/nodename-edit.component';
import { ExecutionPhaseComponent } from './components/production/execution/execution-phase/execution-phase.component';
import { AlisProductResolver } from './components/process/alis-product/alis-product-resolver.service';
import {
    ExecutionAssetDetailsResolver,
} from './components/production/execution/execution-asset/asset-details-resolver.service';
import { ExecutionAssetComponent } from './components/production/execution/execution-asset/execution-asset.component';
import { ExecutionAssetResolver } from './components/production/execution/execution-kit/asset-resolver.service';
import {
    ExecutionKitListComponent,
} from './components/production/execution/execution-kit-list/execution-kit-list.component';
import { ExecutionKitComponent } from './components/production/execution/execution-kit/execution-kit.component';
import { ExecutionKitResolver } from './components/production/execution/execution-kit-list/kit-resolver.service';
import { ExecutionComponent } from './components/production/execution/execution.component';
import { AssetsEditComponent } from './components/production/contracts/contracts-assets/assets-edit/assets-edit.component';
import {
    AssetsDetailComponent,
} from './components/production/contracts/contracts-assets/assets-detail/assets-detail.component';
import { KitsNewComponent } from './components/production/contracts/contracts-kits/kits-new/kits-new.component';
import { ContractKitResolver } from './components/production/contracts/contract-kit-resolver.service';
import { ContractsListComponent } from './components/production/contracts/contracts-list/contracts-list.component';
import { ContractResolver } from './components/production/contracts/contract-resolver.service';
import { ContractsResolver } from './components/production/contracts/contracts-resolver.service';
import { KitsDetailComponent } from './components/production/contracts/contracts-kits/kits-detail/kits-detail.component';
import { KitsListComponent } from './components/production/contracts/contracts-kits/kits-list/kits-list.component';
import { KitsEditComponent } from './components/production/contracts/contracts-kits/kits-edit/kits-edit.component';
import { ContractsKitsComponent } from './components/production/contracts/contracts-kits/contracts-kits.component';
import {
    CustomersLocationsEditLocationComponent,
} from './components/production/customers/customers-locations-edit/customers-locations-edit-location/customers-locations-edit-location.component';
import {
    CustomersLocationsEditListComponent,
} from './components/production/customers/customers-locations-edit/customers-locations-edit-list/customers-locations-edit-list.component';
import {
    CustomersLocationsEditComponent,
} from './components/production/customers/customers-locations-edit/customers-locations-edit.component';
import { CustomersDetailComponent } from './components/production/customers/customers-detail/customers-detail.component';
import { CustomersEditComponent } from './components/production/customers/customers-edit/customers-edit.component';
import { CustomersStartComponent } from './components/production/customers/customers-start/customers-start.component';
import { CustomersComponent } from './components/production/customers/customers.component';
import { ContractsDetailComponent } from './components/production/contracts/contracts-detail/contracts-detail.component';
import { ContractsEditComponent } from './components/production/contracts/contracts-edit/contracts-edit.component';
import { ContractsStartComponent } from './components/production/contracts/contracts-start/contracts-start.component';
import { ContractsComponent } from './components/production/contracts/contracts.component';
import { ProductionComponent } from './components/production/production.component';
import { AssetListComponent } from './components/enterprise/location/asset-list/asset-list.component';
import { NodesListComponent } from './components/enterprise/location/navigation/nodes-list/nodes-list.component';
import { LocationsListComponent } from './components/enterprise/location/navigation/locations-list/locations-list.component';
import { CountriesListComponent } from './components/enterprise/location/navigation/countries-list/countries-list.component';
import { ProcessHomeComponent } from './components/process/process-home/process-home.component';
import {
    AlisProductStartComponent,
} from './components/process/alis-product/alis-product-start/alis-product-start.component';
import {
    AlisProductDetailComponent,
} from './components/process/alis-product/alis-product-detail/alis-product-detail.component';
import { AlisProductEditComponent } from './components/process/alis-product/alis-product-edit/alis-product-edit.component';
import { AlisProductComponent } from './components/process/alis-product/alis-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './body/body.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { LocationComponent } from './components/enterprise/location/location.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'body/enterprise', component: BodyComponent, children: [
        { path: 'home', component: EnterpriseComponent },
        { path: 'location', component: LocationComponent, children: [
            { path: 'country', component: CountriesListComponent },
            { path: 'country/:countryId', component: LocationsListComponent },
            { path: 'country/:countryId/:locationId', component: NodesListComponent },
            { path: 'country/:countryId/:locationId/:nodeId', component: AssetListComponent }
        ] }
    ]},
    { path: 'body/production', component: BodyComponent, children: [
        { path: 'home', component: ProductionComponent },
        { path: 'contracts', component: ContractsComponent, resolve: { contracts: ContractsResolver }, children: [
            { path: '', component: ContractsListComponent },
            { path: 'new', component: ContractsEditComponent },
            { path: ':id', component: ContractsDetailComponent, resolve: {contract: ContractResolver} },
            { path: ':id/edit', component: ContractsEditComponent },
            { path: ':id/kits/new', component: KitsNewComponent },
            { path: ':id/kits/:kitId', component: KitsDetailComponent, resolve: { kit: ContractKitResolver } },
            { path: ":id/kits/:kitId/edit", component: KitsEditComponent },
            { path: ':id/kits/:kitId/assets', component: AssetsDetailComponent },
            { path: ':id/kits/:kitId/assets/edit', component: AssetsEditComponent }
        ] },
        { path: 'execution', component: ExecutionComponent, children: [
            { path: ':kitStatus', component: ExecutionPhaseComponent },
            { path: ':kitStatus/:phase', component: ExecutionKitListComponent, resolve: { kits: ExecutionKitResolver } },
            { path: ':kitStatus/:phase/:kitId/:nodeId', component: ExecutionKitComponent, resolve: { kit: ExecutionAssetResolver }, children: [
                { path: 'nodenames', component: NodenameEditComponent }
            ] },
            { path: ':kitStatus/:phase/:kitId/:nodeId/:assetId', component: ExecutionAssetComponent, resolve: { asset: ExecutionAssetDetailsResolver } }
        ] },
        { path: 'customers', component: CustomersComponent, children: [
            { path: '', component: CustomersStartComponent },
            { path: 'new', component: CustomersEditComponent },
            { path: ':id', component: CustomersDetailComponent },
            { path: ':id/edit', component: CustomersEditComponent },
            { path: ':id/locations-edit', component: CustomersLocationsEditComponent, children: [
                { path: '', component: CustomersLocationsEditListComponent },
                { path: ':customerIndex/new', component: CustomersLocationsEditLocationComponent },
                { path: ':customerIndex/:locationIndex', component: CustomersLocationsEditLocationComponent }
            ] }
        ]}
    ]},
    { path: 'body/process', component: BodyComponent, children: [
        { path: 'home', component: ProcessHomeComponent },
        { path: 'products', component: AlisProductComponent, children: [
            { path: '', component: AlisProductStartComponent },
            { path:'new', component: AlisProductEditComponent },
            { path:':id', component: AlisProductDetailComponent, resolve: { product: AlisProductResolver } },
            { path:':id/edit', component: AlisProductEditComponent }
        ] },
        { path: 'execution', component: ProcessExecutionComponent }
    ]},

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}