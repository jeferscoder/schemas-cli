var pluralize = require('pluralize')
const { strings } = require('gluegun')
module.exports = {
  name: 'make:auth',
  alias: ['m:auth'],
  run: async (toolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
    } = toolbox

    first = 'auth'
    const plural = pluralize.plural(first)
    const singular = pluralize.singular(first)

    // service
    await generate({
      template: 'auth/service.ts.ejs',
      target: `./src/app/modules/${singular}/${singular}.service.ts`,
    })
    info(`Generated file at ${singular}.service.ts`)

    // controller
    await generate({
      template: 'auth/controller.ts.ejs',
      target: `./src/app/modules/${singular}/${singular}.controller.ts`,
    })
    info(`Generated file at ${singular}.controller.ts`)

    // validator
    await generate({
      template: 'auth/validator.ts.ejs',
      target: `./src/app/modules/${singular}/${singular}.validator.ts`,
    })
    info(`Generated file at ${singular}.validator.ts`)

    // dto
    await generate({
      template: 'auth/dto.ts.ejs',
      target: `./src/app/modules/${singular}/${singular}.dto.ts`,
    })
    info(`Generated file at ${singular}.dto.ts`)

    // router
    await generate({
      template: 'auth/router.ts.ejs',
      target: `./src/app/modules/${singular}/router.ts`,
    })
    info(`Generated file at router.ts`)

    // router
    await generate({
      template: 'auth/authenticated.ts.ejs',
      target: `./src/app/middlewares/authenticated.ts`,
    })
    info(`Generated file at authenticated.ts`)

    // modify file routers.ts
    await toolbox.patching.patch(`./src/app/modules/routers.ts`, {
      insert: `\nimport { ${singular} } from '@modules/${singular}/router';`,
      after: new RegExp(`import { Router } from 'express';`),
    })

    await toolbox.patching.patch(`./src/app/modules/routers.ts`, {
      insert: `\n${singular}(routers);`,
      after: new RegExp('// routers;'),
    })
    info(`Updated file at routers.ts`)
  },
}
