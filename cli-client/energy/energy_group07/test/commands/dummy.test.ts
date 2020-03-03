import {expect, test} from '@oclif/test'

describe('Checking dummy commands', () => {
  test
  .stdout()
  .command(['hello'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['hello', '--name', 'vangelis'])
  .it('runs hello --name vangelis', ctx => {
    expect(ctx.stdout).to.contain('hello vangelis')
  })
  
  
  test
  .stdout()
  .command(['goodbye'])
  .it('goodbye runs successfully', ctx => {
    expect(ctx.stdout).to.contain('goodbye, world!')
  })
 
})
