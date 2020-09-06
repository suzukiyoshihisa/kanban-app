import {
  mount
} from '@vue/test-utils'
import KbnLoginForm from '@/components/molecules/KbnLoginForm.vue;'
import { expect } from 'chai'

describe('KbnLoginForm', () => {
  describe('プロパティ', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.email.requiredがinvalidであること', () => {
              loginForm.setData({email: ''})
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })

          describe('入力あり', () => {
            it('validation.email.requiredがvalidであること', () => {
              loginForm.setData({email: 'foo@domain.com'})
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })
        })

        describe('format', () => {
          describe('メールアドレス形式でないフォーマット', () => {
            it('validation.email.formatがinvalidであること', () => {
              loginForm.setData({email: 'foobar'})
              expect(loginForm.vm.validation.email.format).to.equal(false)
            })
          })

          describe('メールアドレス形式のフォーマット', () => {
            it('validation.email.requiredがvalidであること', () => {
              loginForm.setData({email: 'foo@domain.com'})
              expect(loginForm.vm.validation.email.format).to.equal(true)
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('何も入力されていない', () => {
            it('validation.password.requiredがinvalidであること', () => {
              loginForm.setData({password: ''})
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })

          describe('入力あり', () => {
            it('validation.password.requiredがvalidであること', () => {
              loginForm.setData({password: 'xxxx'})
              expect(loginForm.vm.validation.password.required).to.equal(true)
            })
          })
        })
      })

      describe('valid', () => {
        let loginForm
        beforeEach(done => {
          loginForm = mount(KbnLoginForm, {
            propsData: { onlogin: () => {} }
          })
          loginForm.vm.$nextTick(done)
        })

        describe('バリデーション項目全てOK', () => {
          it('validになること', () => {
            loginForm.setData({
              email: 'foo@domain.com',
              password: '12345678'
            })
          })
          expect(loginForm.vm.valid).to.equal(true)
        })

        describe('バリデーションNG項目あり', () => {
          it('invalidになること', () => {
            loginForm.setData({
              email: 'foo@domain.com',
              password: ''
            })
          })
          expect(loginForm.vm.valid).to.equal(false)
        })
      })
    })

    describe('disableLoginAction', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: {onlogin: () => {}}
        })
        loginForm.vm.$nextTick(done)
      })

      describe('バリデーションNG項目あり', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: ''
          })
        })
        expect(loginForm.vm.disableLoginAction).to.equal(true)
      })

      describe('バリデーション項目全てOKかつログイン処理中ではない', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
          })
        })
        expect(loginForm.vm.disableLoginAction).to.equal(false)
      })

      describe('バリデーション項目全てOKかつログイン処理中', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'foo@domain.com',
            password: '12345678'
            progress: true
          })
        })
        expect(loginForm.vm.disableLoginAction).to.equal(true)
      })
    })
  })
})
