import App from './app/App.svelte';

const target: HTMLElement = document.getElementById('app')!;

/** Initialize theme */
const theme = window.localStorage.getItem('theme');
target.dataset.theme = theme ? theme : window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';

const app = new App({ target: target as Element });

const now = new Date();
const uptime = now.getTime() - new Date('2001-10-16').getTime(),
  years = Math.floor(uptime / 31557600000),
  months = Math.floor(uptime / 2629800000 - years * 12),
  days = Math.floor(uptime / 86400000 - years * 365.25 - months * 30.4167);

const loaded = `
                      .ohhs+:\`                     home@navn.me
                       \`/mMMMmy/.                  ---------------------------
                          /NMMMMMd+\`               OS: Linux + Windows
                           oMMMMMMMMy.             Host: Navinn Ravindaran
                 \`:/osyhdmNMMMMMMMMMMN-            Kernel: ${now.getHours()}.${now.getMinutes()}
             -ohNMMMMMMMMMMMMMMMMMMMMMN.           Uptime: ${years} years, ${months} months, ${days} days
          -sNMMMMMmhhyyyhmMMMMMMMMMMMMMh           Packages: 2001 (dpkg)
        :dMMMNy+.          -+dMMMMMMMMMM.          Shell: zsh 5.8
      -dMMMd/                 -hMMMMMMMM+ +yy/     Resolution: 3840x2160, 3840x2160
     oMMMd:                     /MMMMMMMmmMMMMm-   Editor: vscode
    yMMMo                        +MMMMMMMMMMMMMN\`  Font: Fira Code Retina
   yMMM/             -hds  +yo\`   NMMMMMMMMMMMMM/  CPU: AMD Ryzen 9 3900X (24) @ 3.800GHz
  +MMM+       .+.    -mNy \`NMM:   NMMMMMMMMMMMMM+  GPU: NVIDIA GeForce RTX 3080
 \`NMMd       +MMd           .\`    NMMMMMMMMMMMMM.  Memory: 22147MiB / 32098MiB
 +MMM:      /MMMM:                :sdMMMMMMMMMMy   
 dMm+       mMMMMm\`                  \`MMMMMMMMd\`   Made with ♥
 h:         MMMMMMm.                 oMMMMMMMd\`        
            NMMMMMMMy-             .yMMMMMMMo      
            yMMMMMMMMMmy+-.\` \`\`-/smMMMMMMMy.      
            .MMMMMMMMMMMMMMMMMMMMMMMMMMmo\`        
             /MMMMMMMMMMMMMMMMMMMMMNh+.           
              /MMMMMMMMMMMMMNdys+:\`               
               -dMMMMMMMMMd.                      
                 -odMMMMMMM+                      
                    \`/sdMMMMmo.                   
                         .:+oyyo.                 
`;

const onLoad = () => {
  target.style.cssText += 'animation: fade 750ms forwards';
  if (process.env.NODE_ENV === 'production') {
    console.log(loaded);
  }
};

if (document.readyState === 'complete') {
  onLoad();
} else {
  window.addEventListener('load', onLoad);
  document.removeEventListener('load', onLoad);
}

export default app;
