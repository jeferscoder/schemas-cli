var pluralize = require('pluralize')
const { strings } = require('gluegun')
module.exports = {
  name: 'make:modules',
  alias: ['m:modules'],
  run: async (toolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
    } = toolbox

    const { first } = parameters
    const plural = pluralize.plural(first)
    const singular = pluralize.singular(first)
    const upper = strings.upperFirst(plural)

    // model
    await generate({
      template: 'modules/model.ts.ejs',
      target: `./src/app/modules/${plural}/${plural}.model.ts`,
      props: { plural, singular, upper },
    })
    info(`Generated file at ${plural}.model.ts`)

    // repository
    await generate({
      template: 'modules/repository.ts.ejs',
      target: `./src/app/modules/${plural}/${plural}.repository.ts`,
      props: { plural, upper },
    })
    info(`Generated file at ${plural}.repository.ts`)

    // service
    await generate({
      template: 'modules/service.ts.ejs',
      target: `./src/app/modules/${plural}/${plural}.service.ts`,
      props: { plural, upper },
    })
    info(`Generated file at ${plural}.service.ts`)

    // controller
    await generate({
      template: 'modules/controller.ts.ejs',
      target: `./src/app/modules/${plural}/${plural}.controller.ts`,
      props: { plural, upper },
    })
    info(`Generated file at ${plural}.controller.ts`)

    // validator
    await generate({
      template: 'modules/validator.ts.ejs',
      target: `./src/app/modules/${plural}/${plural}.validator.ts`,
      props: { plural, upper },
    })
    info(`Generated file at ${plural}.validator.ts`)

    // dto
    await generate({
      template: 'modules/dto.ts.ejs',
      target: `./src/app/modules/${plural}/${plural}.dto.ts`,
      props: { plural, upper },
    })
    info(`Generated file at ${plural}.dto.ts`)

    // router
    await generate({
      template: 'modules/router.ts.ejs',
      target: `./src/app/modules/${plural}/router.ts`,
      props: { plural, upper },
    })
    info(`Generated file at router.ts`)

    // modify file routers.ts
    await toolbox.patching.patch(`./src/app/modules/routers.ts`, {
      insert: `\nimport { ${plural} } from '@modules/${plural}/router';`,
      after: new RegExp(`import { Router } from 'express';`),
    })

    await toolbox.patching.patch(`./src/app/modules/routers.ts`, {
      insert: `\n${plural}(routers);`,
      after: new RegExp('// routers;'),
    })
    info(`Updated file at routers.ts`)
  },
}
