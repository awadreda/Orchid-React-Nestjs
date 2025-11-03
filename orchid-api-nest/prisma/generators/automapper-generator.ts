import { generatorHandler, DMMF } from '@prisma/generator-helper'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

generatorHandler({
  onManifest() {
    return {
      defaultOutput: '../src/entities',
      prettyName: 'AutoMapper Entities Generator',
    }
  },

  // eslint-disable-next-line @typescript-eslint/require-await
  async onGenerate(options) {
    const outDir = options.generator.output?.value ?? './src/entities'

    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

    options.dmmf.datamodel.models.forEach((model: DMMF.Model) => {
      const className = model.name
      const fields = model.fields
        .filter((f) => f.kind !== 'object') // ✅ FIXED HERE
        .map((f) => `  @AutoMap()\n  ${f.name}${f.isRequired ? '' : '?'}: ${mapPrismaType(f.type)};`)
        .join('\n\n')

      const content = `import { AutoMap } from '@automapper/classes'

export class ${className} {
${fields}
}
`
      writeFileSync(join(outDir, `${className}.ts`), content)
    })

    console.log(`✅ AutoMapper entity classes generated at: ${outDir}`)
  },
})

function mapPrismaType(type: string): string {
  switch (type) {
    case 'Int': return 'number'
    case 'Float': return 'number'
    case 'Decimal': return 'number'
    case 'BigInt': return 'number'
    case 'String': return 'string'
    case 'Boolean': return 'boolean'
    case 'DateTime': return 'Date'
    default: return type
  }
}
