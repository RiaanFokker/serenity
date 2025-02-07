# Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
# Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
# Deploy
Deploy local changes to GH Pages:
ng deploy
Update domain on GH Pages back to keurboomsrl.co.za
# Update
## Update the Angular CLI Globally
npm install -g @angular/cli@latest
## Update TypeScript Globally
npm install -g typescript
## Update Angular CLI and Core Packages
ng update @angular/cli @angular/core
## Update Other Dependencies
ng update
## Clean and Rebuild
delete node_modules and package-lock.json
npm cache clean --force
npm install
ng serve