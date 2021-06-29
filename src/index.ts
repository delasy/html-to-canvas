import type { ElementChildren } from './element'
import { createElement, createFragment } from './element'

const children: ElementChildren = [
  createElement('div', {
    style: {
      alignItems: 'center',
      bottom: '0',
      display: 'flex',
      left: '0',
      position: 'fixed',
      top: '0'
    }
  }, createElement('div', {
    style: {
      backgroundColor: 'rgb(255, 255, 255)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '8px',
      boxShadow: '0 0 16px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      left: '16px',
      padding: '8px',
      position: 'absolute',
      zIndex: '1'
    }
  }, [
    createElement('button', {
      style: {
        backgroundColor: 'rgba(255, 0, 0, 0.08)',
        border: '0',
        borderRadius: '6px',
        color: 'rgba(255, 0, 0, 0.48)',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        fontWeight: 'medium',
        letterSpacing: '1.25px',
        marginBottom: '4px',
        padding: '8px',
        textTransform: 'uppercase',
        userSelect: 'none'
      }
    }, createFragment('button')),
    createElement('button', {
      style: {
        backgroundColor: 'rgba(255, 0, 0, 0.08)',
        border: '0',
        borderRadius: '6px',
        color: 'rgba(255, 0, 0, 0.48)',
        cursor: 'pointer',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        fontWeight: 'medium',
        letterSpacing: '1.25px',
        marginTop: '4px',
        padding: '8px',
        textTransform: 'uppercase',
        userSelect: 'none'
      }
    }, createFragment('container'))
  ]))
]

class Test2134 {
  private _container: HTMLElement | null = null
  private _initialized: boolean = false

  public init (selector: string): void {
    if (this._initialized) {
      throw new Error('Already initialized')
    } else if (document.querySelector(selector) === null) {
      throw new Error('Invalid container selector')
    }

    this._container = document.querySelector(selector) as HTMLElement
    createElement('div', null, children).render(this._container).mountStyles()
    this._initialized = true
  }
}

export default Test2134
