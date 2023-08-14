AndroidInterface.onApiLoaded()

async function openReader() {
    const params = new URLSearchParams(location.search)
    const url = params.get('url')

    try {
        const response = await fetch(url)
        const blob = await response.blob()
        const fileName = new URL(url).pathname
        window.openReader(new File([blob], fileName))
    } catch (error) {
        console.error(error)
        AndroidInterface.onBookLoadFailed(JSON.stringify(error, Object.getOwnPropertyNames(error)))
    }
}

function next() {
    globalThis.reader.view.next()
}

function prev() {
    globalThis.reader.view.prev()
}

function goto(locator) {
    globalThis.reader.view.goTo(locator)
}

function gotoFraction(fraction) {
    globalThis.reader.view.goToFraction(fraction)
}

function getTocFractions() {
    return globalThis.reader.getTocFractions()
}

function setAppearance(appearance) {
    const style = { theme: { light: {}, dark: {} } }
    style.lineHeight = appearance.lineHeight
    style.justify = appearance.justify
    style.hypenate = appearance.hypenate
    style.theme.name = appearance.themeName
    style.theme.light.fg = appearance.lightFg
    style.theme.light.bg = appearance.lightBg
    style.theme.light.link = appearance.lightLink
    style.theme.dark.fg = appearance.darkFg
    style.theme.dark.bg = appearance.darkBg
    style.theme.dark.link = appearance.darkLink
    style.isDark = appearance.useDark

    const layout = {}
    layout.gap = appearance.gap
    layout.maxInlineSize = appearance.maxInlineSize
    layout.maxBlockSize = appearance.maxBlockSize
    layout.maxColumnCount = appearance.maxColumnCount
    layout.flow = appearance.flow

    globalThis.reader.setAppearance(style, layout)
}

function getAppearance() {
    const style = globalThis.reader.style
    const layout = globalThis.reader.layout

    const appearance = {};
    appearance.lineHeight = style.lineHeight
    appearance.justify = style.justify
    appearance.hypenate = style.hypenate
    appearance.themeName = style.theme.name
    appearance.lightFg = style.theme.light.fg
    appearance.lightBg = style.theme.light.bg
    appearance.lightLink = style.theme.light.link
    appearance.darkFg = style.theme.dark.fg
    appearance.darkBg = style.theme.dark.bg
    appearance.darkLink = style.theme.dark.link
    appearance.useDark = style.isDark

    appearance.gap = layout.gap
    appearance.maxInlineSize = layout.maxInlineSize
    appearance.maxBlockSize = layout.maxBlockSize
    appearance.maxColumnCount = layout.maxColumnCount
    appearance.flow = layout.flow

    return appearance
}
