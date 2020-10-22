import { LitElement, html, css } from "lit-element";

class Terminal extends LitElement {
  static get styles() {
    return css`
      :host {
        /* Code Colors */
        /* --green: rgb(137, 202, 120);
        --blue: rgb(82, 173, 242);
        --red: rgb(239, 89, 111);
        --aqua: rgb(43, 186, 197);
        --yellow: rgb(229, 192, 123);
        --salmon: rgb(216, 152, 95); */
      }

      .term {
        padding: 1rem;
        margin-bottom: 1rem;
        color: var(--off-white);
        max-width: 70rem;
        border-radius: 5px;
        user-select: none;
        -webkit-user-select: none;
        border: 0.2rem var(--dark-gray) solid;
        /* filter: drop-shadow(0.25rem 0.25rem 0.1rem black); */
      }

      .dots {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.75rem;
      }

      .dot {
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        border-radius: 50%;
        display: inline-block;
      }

      #term-type {
        /* animation: cursor-blink 0.9s infinite; */
        padding-right: 0.05rem;
        /* border-right: 0.1rem solid var(--off-white); */
        font-family: var(--code);
        line-height: 1.125;
        color: var(--aqua);
      }

      @keyframes cursor-blink {
        50% {
          border-color: transparent;
        }
      }

      #min {
        background-color: rgb(255, 188, 68);
      }
      #max {
        background-color: rgb(55, 200, 79);
      }
      #exit {
        background-color: rgb(254, 86, 82);
      }
    `;
  }

  render() {
    return html`<div class="term">
      <div class="dots">
        <span class="dot" id="exit"></span>
        <span class="dot" id="min"></span>
        <span class="dot" id="max"></span>
      </div>
      <div id="term-text">
        <pre id="term-type"></pre>
        <!-- <font size="-3"> -->
<!-- <pre><font color=black>1000010100110011011010110</font><font color=#151515>1</font><font color=#626262>1</font><font color=#9e9e9e>1</font><font color=#b5b5b5>1</font><font color=#aeaeae>1</font><font color=#939393>0</font><font color=#757575>0</font><font color=#555555>1</font><font color=#313131>0</font><font color=#1c1c1c>1</font><font color=#0a0a0a>0</font><font color=black>100100010000100100010101</font><br><font color=black>111111101010111011000001001</font><font color=#030303>0</font><font color=#272727>0</font><font color=#6a6a6a>0</font><font color=#c2c2c2>0</font><font color=#fdfdfd>0</font><font color=white>0</font><font color=#fdfdfd>0</font><font color=#e9e9e9>1</font><font color=#cecece>1</font><font color=#aaaaaa>1</font><font color=#747474>0</font><font color=#3f3f3f>0</font><font color=#101010>1</font><font color=black>10101001001000110000</font><br><font color=black>110101100111010000110100000010</font><font color=#070707>0</font><font color=#373737>0</font><font color=#b4b4b4>1</font><font color=#fefefe>1</font><font color=white>0001</font><font color=#f9f9f9>0</font><font color=#eaeaea>1</font><font color=#b5b5b5>1</font><font color=#6d6d6d>0</font><font color=#202020>1</font><font color=#050505>1</font><font color=black>1101001100110000</font><br><font color=black>011101111011110011110001101001</font><font color=#020202>0</font><font color=#0b0b0b>0</font><font color=#242424>0</font><font color=#ebebeb>0</font><font color=white>11111000</font><font color=#f9f9f9>0</font><font color=#bbbbbb>0</font><font color=#5e5e5e>0</font><font color=#080808>1</font><font color=black>10010111001011</font><br><font color=black>01011000111100110000</font><font color=#0e0e0e>1</font><font color=#2e2e2e>0</font><font color=#4a4a4a>1</font><font color=#626262>0</font><font color=#7a7a7a>1</font><font color=#8b8b8b>1</font><font color=#9d9d9d>0</font><font color=#ababab>0</font><font color=#b7b7b7>0</font><font color=#c3c3c3>0</font><font color=#cfcfcf>0</font><font color=#d7d7d7>0</font><font color=#e9e9e9>0</font><font color=white>00100011010</font><font color=#fdfdfd>1</font><font color=#afafaf>1</font><font color=#111111>0</font><font color=black>0110001010011</font><br><font color=black>11001110000001</font><font color=#070707>0</font><font color=#1c1c1c>1</font><font color=#4a4a4a>1</font><font color=#828282>1</font><font color=#b3b3b3>0</font><font color=#e0e0e0>0</font><font color=#f8f8f8>1</font><font color=#fbfbfb>1</font><font color=#fdfdfd>0</font><font color=white>11011111010111111100100</font><font color=#c7c7c7>0</font><font color=#101010>0</font><font color=black>010111101100</font><br><font color=black>11110000001</font><font color=#050505>1</font><font color=#373737>1</font><font color=#7f7f7f>0</font><font color=#c3c3c3>0</font><font color=#f1f1f1>1</font><font color=white>0010</font><font color=#f4f4f4>0</font><font color=#dddddd>1</font><font color=#c8c8c8>0</font><font color=#b9b9b9>0</font><font color=#b0b0b0>0</font><font color=#a3a3a3>11</font><font color=#a4a4a4>0</font><font color=#b0b0b0>0</font><font color=#bbbbbb>1</font><font color=#cccccc>1</font><font color=#e0e0e0>0</font><font color=#fafafa>0</font><font color=white>00111000101000</font><font color=#a5a5a5>0</font><font color=#010101>0</font><font color=black>01101110100</font><br><font color=black>11101111</font><font color=#010101>0</font><font color=#121212>1</font><font color=#717171>0</font><font color=#cfcfcf>0</font><font color=#f6f6f6>0</font><font color=white>10</font><font color=#fbfbfb>0</font><font color=#e4e4e4>0</font><font color=#a5a5a5>1</font><font color=#6d6d6d>1</font><font color=#3a3a3a>0</font><font color=#1c1c1c>0</font><font color=#121212>1</font><font color=#090909>0</font><font color=#020202>1</font><font color=black>01000</font><font color=#030303>1</font><font color=#0a0a0a>0</font><font color=#131313>1</font><font color=#232323>1</font><font color=#4d4d4d>0</font><font color=#888888>1</font><font color=#cecece>0</font><font color=#fafafa>1</font><font color=white>0011011011</font><font color=#fcfcfc>0</font><font color=#333333>0</font><font color=black>011</font><font color=#010101>0</font><font color=black>1100100</font><br><font color=black>0000110</font><font color=#202020>1</font><font color=#8c8c8c>1</font><font color=#f0f0f0>1</font><font color=white>11</font><font color=#fcfcfc>0</font><font color=#d4d4d4>1</font><font color=gray>1</font><font color=#333333>0</font><font color=#020202>1</font><font color=black>0000001010111001011</font><font color=#2a2a2a>0</font><font color=#8b8b8b>1</font><font color=#eaeaea>1</font><font color=white>100100000</font><font color=#8b8b8b>1</font><font color=#050505>1</font><font color=#3b3b3b>1</font><font color=#939393>0</font><font color=#ababab>0</font><font color=#9a9a9a>1</font><font color=#5d5d5d>1</font><font color=#1c1c1c>1</font><font color=black>1111</font><br><font color=black>00101</font><font color=#040404>1</font><font color=#717171>0</font><font color=#e7e7e7>0</font><font color=white>010</font><font color=#bfbfbf>1</font><font color=#4f4f4f>0</font><font color=#0e0e0e>0</font><font color=black>111110111111101110100001</font><font color=#242424>1</font><font color=#b2b2b2>1</font><font color=white>00100011</font><font color=#e3e3e3>0</font><font color=#b6b6b6>1</font><font color=#f7f7f7>0</font><font color=white>0110</font><font color=#e6e6e6>0</font><font color=#7e7e7e>1</font><font color=#060606>0</font><font color=black>10</font><br><font color=black>0010</font><font color=#1b1b1b>1</font><font color=#bababa>0</font><font color=#fdfdfd>0</font><font color=white>00</font><font color=#dfdfdf>1</font><font color=#545454>0</font><font color=#060606>1</font><font color=black>00000110001011</font><font color=#010101>0</font><font color=#070707>01</font><font color=black>0001010011</font><font color=#060606>1</font><font color=#aeaeae>0</font><font color=white>101011100111111</font><font color=#fefefe>1</font><font color=#989898>0</font><font color=black>01</font><br><font color=black>101</font><font color=#212121>1</font><font color=#d4d4d4>0</font><font color=white>011</font><font color=#b5b5b5>0</font><font color=#191919>1</font><font color=black>111010000111101</font><font color=#0a0a0a>1</font><font color=#989898>1</font><font color=#c5c5c5>1</font><font color=#c3c3c3>1</font><font color=#878787>1</font><font color=#040404>0</font><font color=black>0</font><font color=#343434>1</font><font color=#8e8e8e>1</font><font color=#9b9b9b>0</font><font color=#7d7d7d>1</font><font color=#1a1a1a>1</font><font color=black>011</font><font color=#2c2c2c>0</font><font color=white>0010111100100000</font><font color=#fbfbfb>1</font><font color=#141414>0</font><font color=black>1</font><br><font color=black>11</font><font color=#0e0e0e>0</font><font color=#cfcfcf>1</font><font color=white>011</font><font color=#b0b0b0>1</font><font color=#0b0b0b>0</font><font color=black>10001011</font><font color=#212121>1</font><font color=#646464>1</font><font color=#464646>0</font><font color=black>01001</font><font color=#0c0c0c>1</font><font color=#b4b4b4>1</font><font color=#e8e8e8>0</font><font color=#e4e4e4>0</font><font color=#a1a1a1>1</font><font color=#050505>0</font><font color=black>1</font><font color=#898989>0</font><font color=#fefefe>1</font><font color=white>0</font><font color=#f7f7f7>1</font><font color=#4f4f4f>1</font><font color=black>101</font><font color=#191919>0</font><font color=white>01000011001000100</font><font color=#161616>1</font><font color=black>0</font><br><font color=black>11</font><font color=#9b9b9b>0</font><font color=white>100</font><font color=#dadada>0</font><font color=#0c0c0c>1</font><font color=black>0110010</font><font color=#141414>1</font><font color=#9d9d9d>0</font><font color=#fcfcfc>1</font><font color=white>1</font><font color=#fcfcfc>0</font><font color=#303030>1</font><font color=black>011110011011</font><font color=#121212>0</font><font color=#212121>0</font><font color=#0a0a0a>1</font><font color=black>0100</font><font color=#171717>1</font><font color=#fcfcfc>1</font><font color=white>100010000101110</font><font color=#bdbdbd>1</font><font color=black>00</font><br><font color=black>1</font><font color=#282828>0</font><font color=#f9f9f9>0</font><font color=white>001</font><font color=#595959>0</font><font color=black>0101001</font><font color=#0a0a0a>0</font><font color=#c4c4c4>1</font><font color=white>0011</font><font color=#b1b1b1>0</font><font color=#020202>1</font><font color=black>001010001001011010</font><font color=#040404>1</font><font color=#515151>0</font><font color=#8b8b8b>0</font><font color=#b2b2b2>1</font><font color=#d6d6d6>0</font><font color=#fdfdfd>1</font><font color=white>0101001001</font><font color=#f1f1f1>0</font><font color=#323232>1</font><font color=black>10</font><br><font color=black>0</font><font color=#7f7f7f>1</font><font color=white>0</font><font color=#f4f4f4>0</font><font color=#b9b9b9>0</font><font color=#6f6f6f>1</font><font color=#050505>0</font><font color=black>0001011</font><font color=#696969>1</font><font color=white>11111</font><font color=#fdfdfd>1</font><font color=#7a7a7a>1</font><font color=#040404>0</font><font color=black>01101110110010011100</font><font color=#020202>1</font><font color=#0c0c0c>1</font><font color=#878787>0</font><font color=white>111011110</font><font color=#f0f0f0>0</font><font color=#494949>0</font><font color=black>101</font><br><font color=black>0</font><font color=#8e8e8e>1</font><font color=#919191>1</font><font color=#232323>0</font><font color=black>1000101100</font><font color=#959595>0</font><font color=white>111111</font><font color=#fefefe>1</font><font color=#acacac>1</font><font color=#2b2b2b>1</font><font color=#010101>1</font><font color=black>1101001101011011111</font><font color=#2d2d2d>0</font><font color=#d8d8d8>0</font><font color=white>01110111</font><font color=#c9c9c9>0</font><font color=#2f2f2f>0</font><font color=black>0010</font><br><font color=black>1</font><font color=#0d0d0d>1</font><font color=black>110001100111</font><font color=#898989>1</font><font color=white>01100101</font><font color=#eeeeee>1</font><font color=#a9a9a9>1</font><font color=#4c4c4c>0</font><font color=#0c0c0c>0</font><font color=black>100100111011010</font><font color=#282828>0</font><font color=#868686>1</font><font color=#ebebeb>1</font><font color=white>0101010</font><font color=#e5e5e5>0</font><font color=#6f6f6f>0</font><font color=#0f0f0f>1</font><font color=black>10011</font><br><font color=black>01111010000101</font><font color=#333333>1</font><font color=#f9f9f9>0</font><font color=white>010100011</font><font color=#fdfdfd>1</font><font color=#f3f3f3>1</font><font color=silver>0</font><font color=#8d8d8d>0</font><font color=#616161>0</font><font color=#3f3f3f>0</font><font color=#262626>0</font><font color=#1d1d1d>0</font><font color=#1a1a1a>0</font><font color=#171717>1</font><font color=#1b1b1b>1</font><font color=#1d1d1d>1</font><font color=#2c2c2c>1</font><font color=#464646>1</font><font color=#6e6e6e>0</font><font color=#9a9a9a>1</font><font color=#d8d8d8>0</font><font color=#fafafa>1</font><font color=white>010010</font><font color=#f6f6f6>1</font><font color=#cccccc>0</font><font color=#666666>1</font><font color=#0b0b0b>1</font><font color=black>0000110</font><br><font color=black>011111100111001</font><font color=#888888>0</font><font color=white>101100111010000</font><font color=#fdfdfd>1</font><font color=#f6f6f6>0</font><font color=#f0f0f0>0</font><font color=#e8e8e8>0</font><font color=#f1f1f1>0</font><font color=#f7f7f7>0</font><font color=white>100101111</font><font color=#f5f5f5>0</font><font color=#c9c9c9>1</font><font color=#848484>1</font><font color=#373737>0</font><font color=#030303>0</font><font color=black>101001010</font><br><font color=black>000111000110111</font><font color=#070707>1</font><font color=#9a9a9a>0</font><font color=#fefefe>1</font><font color=white>101010000100001011100</font><font color=#fefefe>0</font><font color=#fcfcfc>1</font><font color=#f9f9f9>0</font><font color=#eaeaea>1</font><font color=#c1c1c1>0</font><font color=#8e8e8e>0</font><font color=#575757>0</font><font color=#222222>0</font><font color=#090909>1</font><font color=black>010000000111</font><br><font color=black>0000110111101110</font><font color=#010101>1</font><font color=#747474>1</font><font color=#f1f1f1>0</font><font color=white>1011101111101</font><font color=#fdfdfd>0</font><font color=#e8e8e8>0</font><font color=#d8d8d8>1</font><font color=#c8c8c8>0</font><font color=#adadad>1</font><font color=#959595>0</font><font color=#797979>1</font><font color=#5c5c5c>0</font><font color=#3e3e3e>1</font><font color=#1c1c1c>1</font><font color=#020202>0</font><font color=black>01011110100101000</font><br><font color=black>100001011010010110</font><font color=#343434>1</font><font color=#a8a8a8>0</font><font color=#f4f4f4>1</font><font color=white>10011010111</font><font color=#525252>1</font><font color=#1f1f1f>1</font><font color=#0c0c0c>1</font><font color=black>1010111100010111010000100</font><br><font color=black>0001000011011101000</font><font color=#030303>1</font><font color=#161616>1</font><font color=#545454>1</font><font color=#979797>0</font><font color=#d3d3d3>0</font><font color=#f0f0f0>0</font><font color=#fcfcfc>1</font><font color=white>001101</font><font color=#b6b6b6>0</font><font color=#323232>1</font><font color=#080808>0</font><font color=black>1010110011011110000001100</font><br><font color=black>00000111000100001011111</font><font color=#010101>0</font><font color=#1f1f1f>1</font><font color=#4c4c4c>1</font><font color=#7b7b7b>0</font><font color=#ababab>0</font><font color=#cdcdcd>1</font><font color=#e5e5e5>0</font><font color=#f9f9f9>1</font><font color=white>00</font><font color=#fbfbfb>0</font><font color=#c4c4c4>1</font><font color=#757575>1</font><font color=#2f2f2f>0</font><font color=#050505>0</font><font color=black>0010011011101100101010</font><br><font color=black>1110101000000110101010110011</font><font color=#0a0a0a>0</font><font color=#191919>1</font><font color=#272727>1</font><font color=#3e3e3e>1</font><font color=#5b5b5b>1</font><font color=#767676>1</font><font color=#8c8c8c>0</font><font color=#9f9f9f>0</font><font color=#a2a2a2>0</font><font color=#8b8b8b>1</font><font color=#464646>0</font><font color=#010101>0</font><font color=black>11101001001110110101</font><br>
</pre></font> -->
      </div>
    </div>`;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const logo = `
                      .ohhs+:\`                     home@navn.me
                       \`/mMMMmy/.                  ---------------------------
                          /NMMMMMd+\`               OS: macOS Catalina 10.15.6 19G2021 x86_64
                           oMMMMMMMMy.             Host: MacBookPro15,4
                 \`:/osyhdmNMMMMMMMMMMN-            Kernel: 19.6.0
             -ohNMMMMMMMMMMMMMMMMMMMMMN.           Uptime: 19 years, 18 hours, 26 mins
          -sNMMMMMmhhyyyhmMMMMMMMMMMMMMh           Packages: 51 (brew)
        :dMMMNy+.          -+dMMMMMMMMMM.          Shell: zsh 5.7.1
      -dMMMd/                 -hMMMMMMMM+ +yy/     Resolution: 3840x2160, 3840x2160
     oMMMd:                     /MMMMMMMmmMMMMm-   DE: Aqua
    yMMMo                        +MMMMMMMMMMMMMN\`  WM: Rectangle
   yMMM/             -hds  +yo\`   NMMMMMMMMMMMMM/  Terminal: vscode
  +MMM+       .+.    -mNy \`NMM:   NMMMMMMMMMMMMM+  CPU: Intel i5-8257U (8) @ 1.40GHz
 \`NMMd       +MMd           .\`    NMMMMMMMMMMMMM.  GPU: Intel Iris Plus Graphics 645
 +MMM:      /MMMM:                :sdMMMMMMMMMMy   Memory: 6831MiB / 8192MiB
 dMm+       mMMMMm\`                  \`MMMMMMMMd\`  
 h:         MMMMMMm.                 oMMMMMMMd\`        
            NMMMMMMMy-             .yMMMMMMMo      Made with ♥
            yMMMMMMMMMmy+-.\` \`\`-/smMMMMMMMy.      
            .MMMMMMMMMMMMMMMMMMMMMMMMMMmo\`        
             /MMMMMMMMMMMMMMMMMMMMMNh+.           
              /MMMMMMMMMMMMMNdys+:\`               
               -dMMMMMMMMMd.                      
                 -odMMMMMMM+                      
                    \`/sdMMMMmo.                   
                         .:+oyyo.                 

`;
    const text = this.shadowRoot.getElementById("term-type");
    text.innerText = logo;
  }
}

customElements.define("typewriter-term", Terminal);


