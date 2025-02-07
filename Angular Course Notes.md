# Angular Docs
The [docs](https://angular.dev/) are really good and helpful.

# Getting Started
## Install Node.js and Angular CLI
- Install Node.js from [nodejs.org](https://nodejs.org/)
- run `npm install -g @angular/cli`
## Create New Project
- Navigate to a path where you want to create the project folder and run `ng new project-name`. This makes use of the Angular CLI to generate a new project.
- Run `cd project-name`
- Serve the Application `ng serve`
## Build Existing Project
`npm install`
`ng serve`
## Update Existing Project
`ng update`
This will update all packages in `package.json` that supports it and provide commands you can run to update packages.
## Add Application or Library to Existing Project
### Add Application
- Application: `ng generate applicaiton your-application-name`
- To serve the new application, run `ng serve --project=your-application-name`. You can change the default project in `angular.json` -> `defaultProject`
- This approach creates a project folder with the new app while your original app is still outside of this project folder. For a cleaner approach you can run `ng new project-name --create-application=false`, which will create everything except the app, then follow the above approach to have all apps in the project folder.
### Add Library
- Library: `ng generate library your-application-name`
- A library is not very different from an application, it is meant for code reuse and cannot be hosted like an application. `Angular Material` is an example of a library.
- You can also upload your own libraries to `npm` and install it from there.
## How the app is hosted in terms of file structure
ng serve builds and hosts the app

main.ts is the first code that executes
which bootstraps an angular app (a module) - you can bootstrap multiple modules as well
in the module (i.e. app.module.ts), a component is bootstrapped
in the component (i.e. app.component.ts), a selector is defined (i.e. 'app-root')
which is referenced by index.html seen in the browser

components contain html templates that are all compiled into the index.html file by angular
since angular is single page apps, index.html is the only template that is actually seen in the browser

typically, your app component is the parent and you build all other components into that one

# The DOM
The Document Object Model (DOM) is an API for HTML and XML documents. It defines the logical structure of documents and the way a document is accessed and manipulated. Good [video](https://www.youtube.com/watch?v=i_T33FSl254 "youtube.com/watch?v=i_T33FSl254") and [article](https://www.w3.org/TR/WD-DOM/introduction.html "w3.org/TR/WD-DOM/introduction.html") explaining what the DOM is.

> It is best practice to access the DOM with Angular's Renderer2 and not accessing/changing a property of the native element directly.

# Components
A component has a view (.html), module (.ts) and optionally a stylesheet (.css).
To generate a component, run: `ng generate component optional-parent-folder/component-name`     (or `ng g c optional-parent-folder/component-name`)
## Standalone Components
- Standalone components are now available and do not require a module.
- This means that you could potentially get rid of the `app.module.ts` and bootstrap `app.component.ts` directly in `main.ts` with `bootstrapApplication(AppComponent);`.
- You import what you need directly in the component (instead of in the module).
- Set `standalone: true` in the `@Component` decorator.
### Routing in Standalone Components
- Add `RouterModule` to the `imports` of `app.component.ts`.
- Add `importProvidersFrom(YourAppRoutingModule)` to the `providers` of `main.ts`.
### Lazy Loading a Standalone Component
In your routing module, instead of:
`{ path: 'cmp', component: YourComponent }`
do this:
`{ path: 'cmp', loadComponent: () => import('./x/your.component').then((mod) => mod.YourComponent) }`
### Lazy Loading a Set of Routes
Create a file i.e. `routes.ts` with a routes constant:
```
export const DASHBOARD_ROUTES: Route[] = [{
        path: '',
        component: DashboardComponent
    },{
        path: 'today',
        component: TodayComponent
    }
];
```
Then in your main routing module, on activating a certain path, you can load the set of routes:
```
path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      )
```
## Spinner Loading Component Example
- Google `css loading spinner` and copy the CSS and HTML
- Create a `ts` and `css` file i.e. `loading-spinner\loading-spinner.component.css`
- Paste the content in the `css` file and do the following in the `ts` file:
```
import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    // This is the HTML code you copied. Create a HTML file if it is longer.
    template: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
}
```
- Implement it where you need it:
```
<div *ngIf="isLoading" style="text-align: center;">
    <app-loading-spinner></app-loading-spinner>
</div>
```
## Custom Dialog (Backdrop) Component Example
> Note: This can also be done programmatically if needed.
### ts
```
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {
    @Input() message!: string;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}
```
### html
```
<div class="backdrop" (click)="onClose()"></div>
<div class="alert-box">
    <p>{{message}}</p>
    <div class="alert-box-actions">
        <button class="btn btn-primary" (click)="onClose()">Close</button>
    </div>
</div>
```
### css
```
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 50;
}

.alert-box {
    position: fixed;
    top: 30vh;
    left: 20vw;
    width: 60vw;
    padding: 16px;
    z-index: 100;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.alert-box-actions {
    text-align: right;
}
```
### Usage
`<app-alert [message]="error" *ngIf="error"></app-alert>`
# HTML Syntax
### String Interpolation
* `{{ typeScriptVariable }}`                        typeScriptVariable can also just be ts code
### Property Binding
* `[propertyOfElement]="typeScriptVariable"`        typeScriptVariable can also just be ts code
>   Note: If the variable is a string, another syntax could be used (but generally not good practice):
>       `propertyOfElement="stringValue"`
### Event Binding
* `(eventOfElement)="typeScriptFunction($event, [anyCustomParams], [...])"`   `typeScriptFunction` can also just be ts code
>   Note: `eventOfElement` can also be `customEventName` that you implement
### Two-Way Data Binding (combination of Property & Event Binding)
* `[(ngModel)]="typeScriptVariable"`                `typeScriptVariable` can also just be ts code
### Links (hyperlinks)
* `<a href="#" (click)="onClick()"> ...content </a>`
### Structural Directives
* Directive            the * is to indicate that the Directive will change the HTML structure
* i.e. ngIf to add or remove elements
### Control Flow
* @statementName        works similar to *
### Local Reference
* `#variableName`         * can be referenced in HTML only, but can pass as event param to get it in ts code
* a local ref can be placed on any HTML element
  ```
  *to access a local ref in ts w/o an event, @ViewChild('variableName', {static:true}) tsVarName; can be used. {static:true} is needed when accessing it in ngOnInit
  *then access it like this: this.tsVarName.nativeElement.value

  * to access a local ref that has been projected on to a view from another component/view, @ContentChild can be used in the view where the content has been projected.
  * the syntax is the same as @ViewChild
  ```
### Markers (pointer)
* `#markerName`           can be used in HTML to go to a certain element defined as `<ng-template #markerName/>`
> Note `console.log(element)` can give a nice view of what's available to bind to

# TypeScript/JavaScript Syntax
Most of the below and more is explained in [this](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/26105546#overview) course section.
### Operators
Equals is `===`
Not equals `!==`
Adding a `+` before a variable converts it to a number
### Variables/Constants
`let variableName`
`const constantName`    Note: Always use `const` if the value won't change in the instance lifetime
### Object
```
let obj: {
    varName: type, 
    var2Name: type
};
obj = {
    varName: value
    var2Name: value2
};

OR

type YourType = {
    varName: type, 
    var2Name: type
};
let obj: YourType;
```
### Generic types
Indicated by `<>`
`varName = new GenericTypeName<ObjectOrProperty>();`
### Reference types
Reference data types do not have a fixed size unlike primitive types. Such data types include arrays, functions, collections, and all other types of objects.
Important:
* An array variable (ref data type) is actually just a pointer to the actual array data in memory
* So when you set a new variable equal to this one, you're pointing to the same array data
* To create a copy: `newArrayVariable = originalArrayVariable.slice();`
### Spread operator
`...iterableName` used to convert an iterable i.e. array into separate elements.
Useful for combining arrays or passing an array to a function that only accepts a list parameter.
### Functions
```
functionName(param1: DataType, param2?: Any): boolean | string
```
`?` optional parameter
`Any` allows any data type
`|` allows any of these return types
# HTML Default Button Spacing
To have the 4px gap between buttons by default:
- Open `tsconfig.json`
- Add `"preserveWhitespaces": true` under `"angularCompilerOptions"`

# Data Binding
To expose properties to parent components, the input decorator can be used:
`@Input('optionalAliasParameter') propertyName`
> Note: signals are a new way of data binding that is more performant.

# Custom Event Binding
## Define event
`@Output('optionalAliasParameter') customEventName = new EventEmitter <ObjectOrProperty>();`
## Emit event
`this.customEventName.emit({objProperty: this.value, objProperty2: this.value2});`
## Subscribe to event
HTML: `(customEventName)="typeScriptFunction($event)"`
ts: `this.event = this.customEventName.subscribe(this.function)` event parameter passed automatically
    or inline anonymous  function ```
    this.event = this.customEventName.subscribe(
          (eventParam: dataType) => {this.localVar = eventParam;}
     );```
## Unsubscribe from event
Important to unsubscribe to avoid memory leaks. Normally do this in the `OnDestroy` hook.
`this.event.unsubscribe();`

# Custom Property Binding
Accessing HTML elements
* One option is Local Referencing mentioned in HTML Syntax.
* To access an element directly from ts code use `@ViewChild` or `@HostBinding`.
* To project content into components the ng-content directive can be used.
#### @HostBinding
`@HostBinding` can be used to bind to a HTML element attribute i.e.:
    `@HostBinding('style.backgroundColor') backgroundColour: string = 'green';`
`@HostListener` is an easy way to react to events like mouse hover
  
# Component Hooks (Lifecycle Hooks)

These are more or less in the order of when they are expected to be executed.

ngOnChanges - Executed after a bound input property changes
ngOnInit - Executed once the component is initialised (after the Constructor)
ngDoCheck - Executed during every change detection run, so it will be executed even if nothing changed, and it will be executed a lot.
ngAfterContentInit - Executed after content (ng-content) has been projected into view. @ContentChild will work from here.
ngAfterContentChecked - Executed after change detection checked the projected content (ng-content).
ngAfterViewInit - Executed after the component's view (and child views) have been initialised. Here you can start accessing HTML elements i.e. @ViewChild, since they've now been initialised.
ngAfterViewChecked - Executed after every change detection check of the component's view (and child views).
ngOnDestroy - Executed once the component is about to be destroyed.
### Implementation

```
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

export class ServerElementComponent implements OnInit,
                                               OnChanges,
                                               DoCheck,
                                               AfterContentInit, 
                                               AfterContentChecked,
                                               AfterViewInit,
                                               AfterViewChecked,
                                               OnDestroy {
  constructor() { 
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnInit called!');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called!')
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called!');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called!');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called!');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called!');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }
}
```

# Directives

An Angular directive is a class decorator. You can define your own directives to attach custom behaviour to elements in the DOM. Directives are classes that add additional behaviour to elements in your Angular applications.

* Components you create are Directives with a template
* You can also write Directives without templates with the @Directive decorator
* Finally, angular has built-in Directives, like ngModel for 2-way data binding

i.e. `<p *ngif="typeScriptVariable">text </p>`
Can also bind to directive properties, i.e. `[ngStyle]="{backgroundColor: "green"}"`

#### Attribute Directives
Looks like a normal HTML attribute (possibly with data or event binding) and only affect the element they are added to.
##### *.css

```
.cssClassName {
  color: red;
}
```
##### *.html

```
<li class="list-group-item"
     [ngClass]="{cssClassName: boolExpressionOrVar}"
     ----------OR (no css class needed)-----------
     [ngStyle]="{backgroundColor: var % 2 !== 0 ? 'yellow' : 'transparent'}">
     {{content}}
</li>
```
#### Structural Directives
Looks like a normal HTML attribute but has a leading asterisk and affects a whole area in the DOM (elements get added/removed).
```
<div *ngIf="boolExpressionOrVar">
      <li class="list-group-item"
           *ngFor="let x of arrayVariable">
            {{x}}
      </li>
</div>
```

>  The asterisk informs Angular to do the following behind the scenes with the HTML from above:
```
    <ng-template [ngIf]="boolExpressionOrVar">
        <div>
              <li class="list-group-item"
                   *ngFor="let x of arrayVariable">
                    {{x}}
              </li>
        </div>
    </ng-template>
```
>   ng-template is only rendered when it's `[ngIf]` property is true.

It it important to note that the directive is applied to the entire element i.e. `div`, note how the `server` item from the `servers` iterable can be accessed in `ngFor` below.
##### ngFor
> Note how the index can be accessed with ngFor
```
<a [routerLink]="['/servers', server.id]"
*ngFor="let server of servers; let i = index">
  {{ server.name }}
</a>
```
##### ngSwitch
Useful when you have a lot of conditions, used like this:
```
<div [ngSwitch]="typeScriptVariable">
    <p *ngSwitchCase="someValue">Content</p>
    <p *ngSwitchDefault>Default content</p>
</div>
```
#### Custom Attribute Directives
Generate through CLI: `ng generate directive directive-name`      (or `ng g d directive-name`)

The selector is inside [ ] so that the directive is used like a normal class:
    `<p directiveNameSelector>Content</p>`

A main directive property can be added to the directive by using it's selector as a input param or property name:
    Selector as param alias in ts: `@Input('directiveNameSelector');`
    In HTML: `<p [directiveNameSelector]="tsCode">Content</p>`
> This is how Angular's most native directives work
#### Custom Structural Directives
This is the required code, 6 min [video](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/6656186#overview) explains it well
```
@Directive({
  selector: '[appDirectiveName]'
})

export class DirectiveName {
  @Input() set appDirectiveName(condition: boolean) {
    if (condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }  

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }
}
```

# Services
A service is a library of code that can be accessed from anywhere i.e. LogService.
Services should not be instantiated but rather injected (dependency injection).
## Creation
```
@Injectable({providedIn: 'root'}) //Optional, but allows lazy loading and 
 //           doesn't require specifying it in providers[] where injecting.
export class NameOfService { ... }
```
## Usage
By adding the service to the constructor, Angular automatically injects an instance of the service.
The service also need to be added to the providers array.
```
import { NameOfService } from '../nameof.service';  

@Component({
  selector: 'app-selector',
  providers: [NameOfService] //only if not {providedIn: 'root'} in service creation
})

export class NameOfComponent {
  constructor(private nameOfServiceVariable: NameOfService) {
      //Note: the same can be achieved by 
      // omitting it in the ctor param and
      // defining it as a class variable:
      // this.nameOfServiceVariable = inject(NameOfService)
  }
}
```

## Injection
- When injecting a service into a component, the same instance will be used when injecting it in child components **if you don't add it to the providers array** again. It will otherwise create a new instance.
- The highest possible level is in the AppModule, still the same instance will be shared application-wide. Useful when you want to inject the same instance into different services.
- Second highest is the AppComponent; the difference from AppModule is that the same instance won't be shared to other services (since they aren't child objects of AppComponent).
## Service to Service Injection
The service receiving the injection requires some metadata (usually provided by any Angular decorator).
`@Injectable()` can be added to the receiving service - it is best practise to add `@Injectable()` to the injectable service as well.

# Routing
Changes the URL and elements on the DOM without reloading the page.
## Define Routes
Create a constant in `app.module.ts` with the routes following the default path (`localhost:4200/routeName`)
### app.module.ts
```
const appRoutes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'routeName', component: OtherComponent, children: [
    { path: 'childRelativePath', component: ChildComponent }
  ] },
];

imports: [...., RouterModule.forRoot(appRoutes)]
```
> Note: Older web servers that can't be configured to support single page applications will need an additional parameter `RouterModule.forRoot(appRoutes, {useHash: true})` and will add a hash to the start of the route. Avoid this if you can.
#### Separate routing file
You can extract your routes to a single file i.e. `app-routing.module.ts`:
```
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent },
    { path: 'shopping-list', component: ShoppingListComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
```
Then in `app.module.ts`, just add `AppRoutingModule` to the imports.
### app.component.html
router-outlet will do the routing to the different components and the rest will always be visible.
Angular's `routerLink` directive ensures that the page doesn't reload (unlike `href`).
Optionally, a css class can be assigned to `routerLinkActive` to highlight an active tab for example.
```
<ul class="nav nav-tabs">
	<li routerLinkActive="cssAtiveClass">
    	[routerLinkActiveOptions]="{exact: true}"
    	<a routerLink="/">Default Root Path</a>
	</li>
	<li routerLinkActive="cssAtiveClass">
    	<a routerLink="/routeName">Route Name</a>
    </li>
</ul>
<router-outlet></router-outlet>
```
> Note: `[routerLinkActiveOptions]="{exact: true}"` is required to ensure that the root path `/` is not picked up in other routes, since other routes also contain the root path.
### Child Route
In app.module.ts above, `OtherComponent` has one child defined and to display it on `OtherComponent`, `<router-outlet></router-outlet>` should be added to its html.
### Redirecting & Wildcards
```
const appRoutes: Routes = [
  ....
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
```
`**` will match on any path and it is important to have it as the last item in the `Routes` array (it is processed from top to bottom).
## Relative vs Absolute Paths
#### Absolute Path
When you provide a path to `routerLink` or `href` starting with `/`, you're providing the absolute path.
#### Relative Path
If you don't start the path you provide with `/`, Angular will append it to your current path.
Relative paths supports navigation, i.e. `../../newPathName`.
## Navigation
Note that absolute and relative`*` paths apply here as well.
### html
routerLink can be used in any html to navigate to a certain path:
```
<button routerLink="/path">Go</button>
```
### ts
You can navigate to any path by injecting `Router` and then:
```
this.router.navigate(['/path'])
```
`*`Relative paths can be used like this:
```
constructor(private router: Router,
            private route: ActivatedRoute) { }

function() {
    this.router.navigate(['path'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
}
```
> Note: The router array can be used to construct paths like: `['/path', 1, 'test']` will construct `/path/1/test`

`queryParamsHandling` in the `navigate` function can be `'preserve'` or `'merge'`, where:
- `'preserve'`: keeps the current query params (will discard new ones)
- `'merge'`: merges current and new query params
- default (by not specifying `queryParamsHandling`): drops all query params
## Parameters
### Value Parameters
Parameters in the route path can be defined like this `:paramName` which can then be accessed by the referenced component with `ActivatedRoute` injected: `route.snapshot.params['paramName']`.

The route snapshot is typically accessed on component initialisation. You need to subscribe to a route observable (*provided by rxjs and not Angular directly*) to react to path changes not manually entered by the user i.e. through Navigation from above. Implementation example:
```
constructor(private route: ActivatedRoute) { }

ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    
    this.route.params.subscribe(
      (params: Params) => {
    	this.user.id = params['id'];
    	this.user.name = params['name'];
      }
    );
}
```
### Query Parameters & Fragments
Query Parameters: `?` in path, separated by `&`
Fragments: `#` in path, can be used to scroll to certain text or just as additional info
#### html
Expands on `routerLink`:
```
<a [routerLink]="['/path', ...., ....]"
[queryParams]="{param1: 'value', param2: 2}"
[fragment]="'someText'" </a>
```
#### ts
```
this.router.navigate(['/path', variable, ....],
{param1: 'value', param2: 2},
fragment: 'someText'})
```
#### Access
You can access these in the same way as value parameters:
```    
this.route.snapshot.queryParams;
this.route.snapshot.fragment;
this.route.queryParams.subscribe();
this.route.fragment.subscribe();
```
## Route Guards
Logic i.e. authentication triggered before a route is loaded and when leaving the route.
### Can Access Check
Make use of `CanActivateFn`, below ~~`CanActivate`~~ and ~~`CanActivateChild`~~ is deprecated:
```
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): 
                    boolean | UrlTree | Observable<boolean | UrlTree> | 
                    Promise<boolean | UrlTree> {
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;
                    } else {
                        return this.router.createUrlTree(['/']);
                    }
                }
            );
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, 
                     state: RouterStateSnapshot):
                        boolean | UrlTree | Observable<boolean | 
                        UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
```
These functions can then be added to where your routes are defined as parameters:
```
{ path: 'path', canActivateChild: [AuthGuardService], component: YourComponent, children: [
    { path: 'childPath', component: YourChildComponent }
  ] }
```
### Can Leave Check
Similar to `CanActivate`, `CanDeactivate` can be used.
## Passing Data to Routes
### Static Data
Define:
```
const appRoutes: Routes = [
  { path: '', component: DefaultComponent, data {paramName: data} }
];
```
Access (only need subscribe, but if you know it won't change, snapshot can be used):
```
dataVar: DataType;
constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.dataVar = this.route.snapshot.data['paramName'];
    this.route.data.subscribe(
      //Data below is a dummy data type from @angular/router
      (data: Data) => {
        this.dataVar = data['paramName']
      }
    )
  }
```
### Dynamic Data
Like asynchronously fetching data from a server.
> Note: You could also fetch data in the component's `OnInit`, but with this `resolve` function, the data is fetched before displaying the component.

Define:
```
const appRoutes: Routes = [
  { path: '', component: DefaultComponent, resolve {paramName: data} }
];
```
Accessing the dynamic data in the component is done the exact same way as with [[#Static Data]] above (it is also passed in with the route's `data` property).
## Defining routes in a separate module
You define it similar to above in the main app, but for separate modules you use `forChild` instead of `forRoot` on the `RouterModule`, i.e.:
```
const routes: Routes = [
    { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
        {path: '', component: RecipeStartComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {
}
```
Then you just import `RecipesRoutingModule` in the `@NgModule` if this module.

This appends these routes to the routes already contained in `RouterModule` for the instance of the app.
# Observables
When you subscribe to an observable in a non-Angular library, you need to manually unsubscribe to ensure memory is cleared. Angular does this for you in the background when using Angular observables.
## Unsubscribe
Very important when using non-Angular observables.
You can unsubscribe in the `OnDestroy` hook.
```
private sub: Subscription;

ngOnInit() {
  this.sub = interval(1000).subscribe(count => {
    console.log(count);
  });
}

ngOnDestroy(): void {
  this.sub.unsubscribe();
}
```
## Subscriptions
Other than the observable event, you can subscribe to observable events such as `error` and `complete`.
## Operators
You can apply operators to any observable and subscribe to the result rather than modifying the data in the subscribe function. `rxjs` has a long list of operators.
```
import { map, filter, take } from 'rxjs/operators';
private yourSubscription: Subscription;

let customIntervalObsPipe = customIntervalObs.pipe(
  filter(data => { return +data > 0; }),
  map((data: number) => 'Round ' + (data + 1))
);

//The take operator automatically unsubscribes when used like this
let customIntervalObsPipe2 = customIntervalObs.pipe(take(1)).subscribe();

this.yourSubscription = customIntervalObsPipe.subscribe(data => {
  console.log(data);
});
```
`tap` can be used to look at the data but not modify it: `pipe(tap(x => {...}))`
> Note: the `js` function `pipe` allows for chaining operators, i.e.: `pipe(take(1), map(...))`
## Subjects
Almost the same as `EventEmitter`, but preferred above it for cross component communication where you don't need `@Output` but `subscribe` to changes.
It is important to `unsubscribe` from the Subject.
```
//Define
@Injectable({providedIn: 'root'})
export class UserService {
  activatedEmitter = new Subject<boolean>();
}

//Sub & Unsub
ngOnInit() {
  this.activatedSub = this.userService.activatedEmitter.subscribe(activated => {
    this.userActivated = activated;
  })
}
ngOnDestroy(): void {
  this.activatedSub.unsubscribe();
}

//Next (Emit)
onActivate() {
  this.userService.activatedEmitter.next(true); //.next instead of .emit
}
```
## Behaviour Subjects
`BehaviorSubject` works the same as `Subject`, except that you can access the last emitted event's data even if you weren't subscribed at the time.

# Forms
## Template Driven
Import `FormsModule` in `app.module.ts`.
### html
```
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
    <input ngModel name=anyName>
    <button type="submit">Submit</button>
</form>
```
### ts
```
onSubmit(form: NgForm) {
  console.log(form);
}

// OR

@ViewChild('f') yourForm: NgForm;
onSubmit() {
  console.log(this.yourForm);
}
```
### Validation
#### html
```
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
    <input ngModel name=anyName
    required email
    #e="ngModel">
    <p *ngIf="!e.valid && e.touched">Validation text</p>
    
    <button type="submit"
    [disabled]="!f.valid">Submit</button>
</form>
```
##### NgForm (#f)
With `required` and/or `email`, the `valid` property is set on NgForm and Angular also adds a class to the HTML element `ng-invalid` so that you can style it.
##### NgModel (#e)
By placing a local ref on input above, the properties of that model can be access i.e. `!e.valid && e.touched`.
#### css
Chain as many classes as you want separated with a dot:
```
input.ng-invalid.ng-touched {
  border: 1px solid red;
}
```

### Radio buttons
```
<div class="radio" *ngFor="let gender of genders">
  <label>
	<input name="gender" 
		  type="radio"
		  ngModel
		  [value]="gender"
          required>
	{{gender}}
  </label>
</div>
```
### Access to forms/user inputs
```
@ViewChild('f') yourForm: NgForm;
onSubmit() {
  console.log(this.yourForm.value.htmlNameOfField);
  this.yourForm.reset(); //reset() also takes an object if you want to reset it to a specific state
}
```

## Reactive
Form is defined in .ts.
Add `ReactiveFormsModule` to imports in `app.module.ts`.
> Note: Two useful Observables on `FormGroup` or any control is `valueChanges` and `statusChanges` to which you can subscribe.
### ts
```
yourForm: FormGroup;

ngOnInit(): void {
  this.yourForm = new FormGroup({
    'nesting' = new FormGroup({
        'yourControlOne': new FormControl(null, Validators.required),
    }
    'yourControl': new FormControl(null, [Validators.required, Validators.email]),
    'yourArray': new FormArray([]),
  });
}

onAddArrayControl() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.yourForm.get('yourArray')).push(control);
}

getControls() {
    return (<FormArray>this.yourForm.get('yourArray')).controls;
}
```
> Note: `'yourControl'` doesn't have to be in quotes, but it is safer in terms for compilation process.
> 
> Note: You can create custom async validators (or synchronous) as well if validation occurs on a server.
### html
```
<form [formGroup]="yourForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
        <input
            type="text"
            id="yourControl"
            formControlName="yourControlName"
            class="form-control">
        <span *ngIf="!yourForm.get('yourControl').valid">Your text</span>
    </div>
    <div formGroupName="nesting">
        <input
            type="text"
            id="yourControlOne"
            formControlName="yourControlOneName"
            class="form-control">
        <span *ngIf="!yourForm.get('nesting.yourControlOne').valid">Your text</span>
    </div>
    <div formArrayName="yourArray">
        <button type="button" (click)="onAddArrayControl()">Button Text</button>
        <div *ngFor="let arrayControl of getControls(); let i = index">
        <input type="text" class="form-control" [formControlName]="i">
        </div>
    </div>
    <span *ngIf="!yourForm.valid && yourForm.touched">Please enter valid data.</span>
</form>
```
### Setting/Changing Values
`this.yourForm.setValue({...})`, it should represent your defined form structure.
To update only a part of the form, use `this.yourForm.patchValue({...})`.
`this.yourForm.reset()` works the same as TD approach: [[#Access to forms/user inputs]]

# HTTP Requests
Import `HttpClientModule` in `app.module.ts`
> Note: If you do not subscribe to the request to receive the response, Angular will not send the request.
> Note: To handle errors in the subscribe function, use the second parameter.
## POST
```
constructor(private http: HttpClient) {}

onCreatePost(postData: { title: string; content: string }) {
this.http
  .post<{name:string}>('https://angular.firebasedatabase.app/posts.json', postData)
  .subscribe(responseData => {
	console.log(responseData);
  });
}
```
## GET
Key takeaway here is that the response can be piped to modify data with the `map` `rxjs` function.
```
this.isFetching = true;
this.http
  .get<{[key:string]:YourClass}>('https://angular.firebasedatabase.app/posts.json')
  .pipe(map(responseData => {
    const postsArray: YourClass[] = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
      postsArray.push({ ...responseData[key], id: key });
      }
    }
    return postsArray;
  }))
  .subscribe(posts => {
    this.isFetching = false;
    console.log(posts);
  });
```
> Note: The type specification (`.get<{[key:string]:YourClass}>`) is optional. Helps with detecting errors and autocomplete.
> 
> Note: `isFetching` can easily be used in the template to show `Loading...`.
> Note: `tap` can be used to look at the data but not modify it: `pipe(tap(x => {...}))`

## HTTP Interceptors
Intercepts any HTTP request before it is sent and/or when it is received. You can have more than one.
### Interceptor service
```
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        return next.handle(req); // Here you can pipe the response to read/modify it
    }
}
```
> Note: Interceptors need to be manually specified in `providers` in `app.module`, so `@Injectable` should not contain the `providedIn: 'root'` parameter.
### Enable interceptor(s) in `app.module`
The interceptors will intercept in the order specified here:
```
providers: [
  { provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptorService, 
    multi: true 
  },
  { 
    provide: HTTP_INTERCEPTORS, 
    useClass: LoggingInterceptorService, 
    multi: true
  }
]
```

# Security
One option is to use Firebase:
- Enable Email/Password authentication
- Google search `Firebase Auth REST API` and open Firebase official documentation
- Go to `Sign up with email / password` for example to get the endpoint details
- Replace `API_KEY` in the endpoint URL with your Firebase project's API key:
    - Project settings -> `Web API Key`
- Then you can call the endpoint with the request body specified, i.e.:
  ```
      this.http.post('https://....:signUp?key=API_KEY ', {
            email: 'x@y.com',
            password: 'pass',
            returnSecureToken: true
        })
    ```
# Local Storage
Can either use cookies or the browser's local storage.
## Browser local storage
Storage of key-value-pairs in string.
> Note: JSON functions are optional in the examples below.
### Write
Once stored, can see in dev tools Application > Local Storage
`localStorage.setItem('userData', JSON.stringify(user));`
### Read
`JSON.parse(localStorage.getItem('userData'));`
### Delete
`localStorage.removeItem('userData');`
## NgRx
NgRx is a state management solution for application wide data (in memory, i.e. variables).
It is sometimes helpful in complex projects where you need a single source of truth of all your data that components interact with.
Udemy course [here](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/38137498#questions).

# Modules
Created with @NgModule and made available to other modules with the `exports` array.
```
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
```
Routes can be defined in this module itself as well. See [[#Defining routes in a separate module]].
## Imports
- A module is standalone and don't have access to any other module's imports, so you need to explicitly import all required modules except for services which are available application wide.
- Angular features like `ngIf` and `ngFor` are in the `BrowserModule`, but you should only import this once because it does general app start-up work that should only run once. Instead use `CommonModule` in all custom modules.
## Declarations
You can only declare an object once an in app, thereafter you should just export & import it where needed.
## Lazy Loading
*The opposite of lazy loading is eager loading.*
The module you want to lazy load need to have its own routes configured (`forChild`).
In the example below, `your.module.ts` including all its imports will be loaded when visiting `yourLazyLoadingPath`:
```
const appRoutes: Routes = [
    { path: 'yourLazyLoadingPath', loadChildren: () => import('./moduleFolder/your.module').then((mod) => mod.ModuleClassName)}
];
```
> Note: You should move `yourLazyLoadingPath` from the module to your `appRoutes`. So in your module `path: ''` because `yourLazyLoadingPath` is now passed in.

Remove the `ModuleClassName` import from `app.module.ts`.
### Enable Preloading
Lazy loading with preloading will first load required modules and then preload lazy-load modules during idle time, thereby improving navigation speed.
To enable it, on your main routes, add this `preloadingStrategy`:
`imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})]`
> Note: You can also create your own strategy.
### Services in Lazy Loaded Modules
It is important to note that when you provide `providers: []` a service in a lazy loaded module, it will create that instance when the module is loaded (even if it is inherited from a shared module). So you could end up with different instances of that service. 
> Note: Avoid this easily by using `@Injectable({ providedIn: 'root' })` on your services.

Eager-loaded modules where you provide a service will cause it to be available app-wide and should be avoided.

# Deployment
## Environment Variables
You can add any key-value-pairs in `environment.ts` and `environment.prod.ts`. 
Use it like this (never prod - angular will do this automatically in prod mode):
```
import { environment } from "src/environments/environment";

console.log(environment.myVar)
```
## Build for Prod
This converts all ts code to js, optimises it and places everything in the `dist` folder:
`ng build`
## Hosting
### Automatic Deployment
`ng deploy` allows for automatic deployment to supported services i.e. [GitHub Pages](https://angular.dev/tools/cli/deployment#automatic-deployment-with-the-cli:~:text=to%20the%20top-,Automatic%20deployment%20with%20the%20CLI,-The%20Angular%20CLI)
### GitHub Pages
- `npm install --save-dev angular-cli-ghpages` can be installed globally as well with `-g` flag
- `ng add angular-cli-ghpages`
- `ng deploy --base-href=/your-repo-name/`
### Firebase
Firebase supports free static page hosting like GitHub Pages.
- `npm install -g firebase-tools`
- `firebase login` (web-login via Google account)
- In your project, run `firebase init`, select `Hosting` with `Space` and then `Enter`
    - Note: In this project we do use a Firebase database, but not through the Firebase SDK - so no need to tick `Database` in the selection.
- Select related project or create new one
- `What do you want to use as your public directory?`
  The public directory is what will be hosted, so pass `dist\course-project`
- `Configure as a single-page app (rewrite all urls to /index.html)?` y
  This is important, you always want your all your traffic to be routed to `index.html`
- Don't overwrite existing index.html
- `firebase deploy`
- Go to web page using provided `Hosting URL`
> Note: To stop hosting, run `firebase hosting:disable`
## Differential Loading
Loading of the page on modern and legacy browsers. Legacy browsers requires polyfills to make it function correctly, which makes the download from the server larger. Angular manages automatically and downloads the correct package for the browser the user is using, this is called differential loading.

# Angular Server-Side Rendering
Since you create an SPA in Angular by default, the HTML content is minimal because the content of the page is mostly driven from JavaScript. This means bad Search Engine Optimization (SEO) affecting page ranking and minimal negative performance impacts (for slow devices/networks).

The solution is Angular SSR (which makes use of NodeJs), which pre-renders the Angular app on the server and the finished HTML code is sent to the client. Thereafter, it becomes a client-side SPA again.
> Note: A static website provider like GitHub Pages isn't sufficient for SSR, you need a provider that supports server side code execution (NodeJs)
## Enable SSR
- Run `ng add @angular/ssr`
- To create a new Angular project that comes with SSR enabled out of the box, run `ng new <project-name> --ssr`
> Note: The run command might not be `ng serve` for SSR, Google it. To make sure it worked, inspect you HTML file, it should have more content.
## Service Worker
Can be seen as a proxy between the FE and BE that caches traffic, typically used in PWAs.
Enable by running `ng add @angular/pwa` (command might be outdated).
Then you can specify which assets should be cached.
## Lightweight HTTP Server
Enables you to host a simple NodeJs based server.
`npm install -g http-server` (`-g` makes it available system-wide)
To host the content of the folder you are in, run `http-server -p 8081` hosted on `localhost:8081`

# Solutions to some issues
## Component focus jumping around
Add `FormsModule` to the `imports` array of app.module.ts
## CLI Component Generate Error
More than one module matches.
Specify the module you want to generate the component in: `ng g c new-component --module app`

# Bootstrap
Horizontal alignment: `<div class="justify-content-..."></div>`
Vertical alignment: `<div class="align-items-..."></div>`