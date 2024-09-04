import { Text, TextOptions } from 'pixi.js'

export class FancyText extends Text {
  constructor(options: TextOptions) {
    super({
      ...options,
      style: {
        fontSize: 8,
        fill: 0x333333,
        align: 'center',
        ...options.style,
      },
    })
  }
}
