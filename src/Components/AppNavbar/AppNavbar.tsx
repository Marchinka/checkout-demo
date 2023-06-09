import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AppRoutes } from '../../Pages/AppRoutes'
import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Checkout', to: AppRoutes.home, current: true },
  { name: 'Products', to: AppRoutes.products, current: false },
  { name: 'Rules', to: AppRoutes.rules, current: false }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function UserMenu() {
    return <></>
}

function MobileMenu() {
    return <Disclosure.Panel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
                <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    </Disclosure.Panel>
}

function NavigationItems() {
    return <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
            {navigation.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive, isPending }) => classNames(
                        isActive
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    {item.name}
                </NavLink>
            ))}
        </div>
    </div>
}

function Logo() {
    return <div className="flex-shrink-0">
        <img
            className="h-8 w-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company" />
    </div>
}

export const AppNavbar = () => {
    return <Disclosure as="nav" className="bg-gray-800">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              {Logo()}
              {NavigationItems()}
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                {UserMenu()}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>
        </div>
        {MobileMenu()}
      </>
    )}
  </Disclosure>
}