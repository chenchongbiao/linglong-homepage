const { generateVersions } = require('./versions.js')
const { defaultVersion, versions } = generateVersions()

// 定义每个类别及其子项的映射
const categoryMappings = {
    "zh": {
        "docs_version": {
            "item": "文档版本",
            "defaultVersion": defaultVersion,
            "link": "/start/whatis.md"
        },
        "language": {
            "text": "语言",
            "items": [
                { "text": '中文', "link": '/guide/start/whatis.md' },
                { "text": '英文', "link": '/en/guide/start/whatis.md' }
            ]
        }
    },
    "en": {
        "docs_version": {
            "item": "Doc Version",
            "defaultVersion": defaultVersion,
            "link": "/start/whatis.md"
        },
        "language": {
            "text": "Language",
            "items": [
                { "text": 'Chinese', "link": '/guide/start/whatis.md' },
                { "text": 'English', "link": '/en/guide/start/whatis.md' }
            ]
        }
    }
}

// 函数来生成特定语言和版本的导航栏
function generateNav(language) {
    lst = []
    const docs_items = [];

    // 检测 md 文件是否存在。
    versions.forEach(version => {
        const versionPrefix = version ? `${version}/` : '';
        const pathPrefix = language === 'zh'
            ? `/${versionPrefix}guide`
            : `/${versionPrefix}${language}/guide`;
        const defaultVersion = version ? `${version}` : categoryMappings[language]['docs_version']['defaultVersion'];
        docs_items.push({
            text: defaultVersion,
            link: `${pathPrefix}${categoryMappings[language]['docs_version']['link']}`
        });
    });

    lst.push({
        text: categoryMappings[language]['docs_version']['item'],
        ariaLabel: "Version Menu",
        items: docs_items
    });

    lst.push({
        text: categoryMappings[language]['language']['text'],
        items: categoryMappings[language]['language']['items']
    })

    return lst;
}

module.exports = { generateNav };
