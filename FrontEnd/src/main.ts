import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import en from  '../assets/en.json'



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


function getText(path: string, obj: any): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

function renderTexts(obj: any) {
  document.querySelectorAll('*').forEach(el => {
    if (el.textContent?.match(/{{(.*?)}}/)) {
      el.textContent = el.textContent.replace(/{{(.*?)}}/g, (_, path) => {
        return getText(path.trim(), obj) || '';
      });
    }
  });
}

renderTexts(en);