import React, {useState} from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { ArchiveBoxIcon, Bars3Icon, CheckCircleIcon, EnvelopeIcon, HomeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {  CheckIcon } from '@heroicons/react/20/solid'
import { Bars3BottomLeftIcon, MagnifyingGlassIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'


import customIcon from '../images/set-logo.webp';
import oldImage from '../images/image49.webp';
import newImage from '../images/newway.jpg';
import processImage from '../images/processImage.png';
import heroImage from '../images/hero.png';
import connectImage from '../images/connect.png';
import flowImage from '../images/flow.png';

const streamlineProcess = [
  {
    name: 'Efficiency',
    description:
      'Save time with automated processes and centralized data management.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Clarity',
    description:
      'Access all necessary information in one place, eliminating confusion and errors.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Focus',
    description:
      'Concentrate on strategic decisions rather than administrative tasks.',
    icon: CheckBadgeIcon,
  }
]

const matchMarkers = [
  {
    name: 'Clarity',
    description:
      'Advanced algorithms provide highly accurate match suggestions based on your specific criteria',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Customization',
    description:
      ' Tailor your search and receive recommendations that fit your unique needs.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Opportunity Maximization',
    description:
      'Discover opportunities you might have missed with manual searches.',
    icon: CheckBadgeIcon,
  }
]


const features = [
  {
    name: 'Aggregating Data',
    description:
      'We collect and streamline all necessary data, wishes and wants.',
    icon: Bars3BottomLeftIcon,
  },
  {
    name: 'Sourcing targets',
    description:
      'We immediately are able to provide the best matches from our database',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Selecting & contacting matches',
    description:
      'Once matched, partner brokers and advisors continues the process',
    icon: CheckBadgeIcon,
  },
]

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Contact', href: '#contact' },
]

const oldWay = [
  {
    name: 'Sole Focus on Financials',
    description:
      'Traditional methods overlook interpersonal and cultural factors that are critical for a successful transition.',
    icon: XMarkIcon,
  },
  {
    name: 'Time-Consuming and Inefficient.',
    description: 'Brokers and sellers rely on personal networks, making the process slow and prone to mismatches.',
    icon: XMarkIcon,
  },
  {
    name: 'High Failure Rates',
    description: 'Mismatches in expectations or poor cultural alignment frequently lead to failed negotations or post-sale challenges.',
    icon: XMarkIcon,
  },
]

const newWay = [
  {
    name: 'Cultural and Personal Alignment',
    description:
      'Silver Era Transition prioritizes cultural fit and interpersonal compabtibility, ensuring smoother transitions and long-term success for businesses.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Preserving Legacy',
    description: "Silver Era Transition helps sellers find successors who align with their values and vision, ensuring their life's work continues authentically",
    icon: CheckBadgeIcon,
  },
  {
    name: 'Streamlined Process',
    description: "With Silver Era Transition's structured platform, buyers, sellers and brokers save time by filtering and matching based on key personal and business factors.",
    icon: CheckBadgeIcon,
  },
]

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">


      {/* HERO SECTION */}

    
      <header className="absolute inset-x-0 top-0 z-50 bg-[#385454]">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={customIcon}
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-sm/6 font-semibold text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>





  <div
      className="relative isolate px-6 pt-14 lg:px-8"
      style={{
        background: "linear-gradient(to bottom, #385454, #fff)",
        height: "100vh",
      }}
    >
  <div
    style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "right",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
      filter: "blur(11px)",
      transform: "scale(0.8)",
    }}
    className="absolute inset-y-0 right-0 -z-10"
  />

  <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <div className="hidden sm:mb-8 sm:flex sm:justify-center">
      <div className="relative rounded-full px-3 py-1 text-sm/6 text-black ring-1 ring-gray-900/10 hover:ring-gray-900/20">
        Silver Era Transition
      </div>
    </div>
    <div className="text-center">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-5xl">
        The European Crossroad For Generational Transitions
      </h1>
      <p className="mt-8 text-pretty text-lg font-medium text-gray-900 sm:text-xl/8">
        AI Powered Matchmaking for Smooth Company Sales & Acquisition
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/register"
          className="rounded-md bg-[#385454] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2e4646] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </a>
        <a href="#comparison" className="text-sm/6 font-semibold text-white">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
</div>

  
  
      
     

      {/* FEATURES SECTION */}

      <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4" id="comparison">
            <div className="lg:max-w-lg">
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                The old way
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {oldWay.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src={oldImage}
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[50rem] md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>      






    <div className="overflow-hidden bg-white py-24 sm:py-32">
  <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div className="flex justify-end">
        <img
          alt="Product screenshot"
          src={newImage}
          width={2432}
          height={1442}
          className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] lg:-ml-8"
        />
      </div>
      <div  className="lg:pl-8 lg:pt-4 ml-8">
        <div className="lg:max-w-lg">
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            The SET way
          </p>
 
          <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
            {newWay.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-indigo-600" />
                  {feature.name}
                </dt>{' '}
                <dd className="inline">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </div>
</div>


{/* THE PROCESS SECTION */}

<div
  className="bg-white py-24 sm:py-32"
  style={{
    background: "linear-gradient(to bottom, #fff, #385454)",
    minHeight: "100vh",
  }}
>
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-base/7 font-semibold text-black">How does it work?</h2>
      <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-balance mt-8">
        Jumpstarting The Journey
      </p>
      <div className="flex justify-center mt-8">
        <img
          alt="Process screenshot"
          src={processImage}
          width={2432}
          height={1442}
          className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
        />
      </div>
    </div>
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-3 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-x-12 lg:gap-y-12">
        {features.map((feature) => (
          <div key={feature.name} className="relative pl-16">
            <dt className="text-base/7 font-semibold text-white">
              <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-[#385454]">
                <feature.icon aria-hidden="true" className="size-6 text-white" />
              </div>
              {feature.name}
            </dt>
            <dd className="mt-2 text-base/7 text-white">{feature.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  </div>
</div>

{/*  FIND THE RIGHT MATCH SECTION */}
<div className="bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center">
    {/* Left Image Section */}
    <div className="w-full lg:w-1/2">
      <img
        src={connectImage} // Replace with your image source
        alt="Illustration of finding the right match"
        className="rounded-xl shadow-xl"
      />
    </div>
    {/* Right Text Section */}
    <div className="w-full lg:w-1/2 lg:pl-24">
      <div className="mx-auto max-w-2xl lg:text-left">
        <p className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-balance">
          Find the right match
        </p>
      </div>
      <div className="mx-auto max-w-10xl lg:text-left mt-8">
        <p className="text-pretty text-sm font-medium text-gray-900 sm:text-xl/8">
          Our advanced algorithms and comprehensive data analysis ensure you find the perfect match for your business needs. Input your criteria, and let our system do the rest. Get tailored recommendations that align with your goals and maximize your opportunities for success.
        </p>
      </div>
      <div className="lg:max-w-lg mt-10">
        <dl className="max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
          {matchMarkers.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-indigo-600" />
                {feature.name}
              </dt>{' '}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </div>
</div>





{/*  STREAMLINE YOUR PROCESS */}
<div className="bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center">
    {/* Left Text Section */}
    <div className="w-full lg:w-1/2 lg:pr-24">
      <div className="mx-auto max-w-2xl lg:text-left">
        <p className="text-pretty text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-balance">
          Streamline your process
        </p>
      </div>
      <div className="mx-auto max-w-10xl lg:text-left mt-8">
        <p className="text-pretty text-sm font-medium text-gray-900 sm:text-xl/8">
        Simplify and accelerate your M&A journey with our intuitive platform. Effortlessly manage your search, connect with potential partners, and access all relevant data in one centralized location. Reduce the complexity and focus on what truly matters—making strategic decisions.
        </p>
      </div>
      <div className="lg:max-w-lg mt-10">
        <dl className="max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
          {streamlineProcess.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-indigo-600" />
                {feature.name}
              </dt>{' '}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
    {/* Right Image Section */}
    <div className="w-full lg:w-1/2">
      <img
        src={flowImage} // Replace with your image source
        alt="Illustration of finding the right match"
        className="rounded-xl shadow-xl"
      />
    </div>
  </div>
</div>



{/* FOOTER SECTIOn */}

<footer id="contact" class="bg-blue-100/80 font-sans dark:bg-[#385454]">
    <div class="container px-6 py-12 mx-auto">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div class="sm:col-span-2">
                <h1 class="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">Subscribe our newsletter to get an update.</h1>

                <div class="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                    <input id="email" type="text" class="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address" />
            
                    <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-[#385454] transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-white rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                        Subscribe
                    </button>
                </div>
            </div>

            <div>
                <p class="font-semibold text-gray-800 dark:text-white">Quick Links</p>

                <div class="flex flex-col items-start mt-5 space-y-2">
                    <p class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">About Us</p>
                    <p class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Service</p>
                    <p class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Pricing</p>
                    <p class="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Blog</p>
                </div>
            </div>

            <div className='w-full'>
                <p class="font-semibold text-gray-800 dark:text-white">Contact Us</p>

                <div className="space-y-4 mt-5">

                  <div class="flex items-center space-x-2">
                      <a href="mailto:info@tomatoworld.nl" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">info@tomatoworld.nl</a>
                  </div>

                  <div class="flex items-center space-x-2">
                      <p class="text-gray-600 dark:text-gray-300">
                          TomatoWorld, <span class="block">Zwethlaan 2, 2675 LB Honselersdijk</span>
                      </p>
                  </div>

                  <div class="flex items-center space-x-2">
                      <a href="tel:+31174612525" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">0174 612 525</a>
                  </div>
              </div>

            </div>
        </div>
        
        <hr class="my-6 border-gray-200 md:my-8 dark:border-gray-700 h-2" />
        
        <div class="sm:flex sm:items-center sm:justify-between">            
            <div class="flex gap-4 hover:cursor-pointer">
                <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="30" height="30" alt="fb" />
                <img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="tw" />
                <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="inst" />
                <img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="in" />
            </div>
        </div>
        <p class="font-sans p-8 text-start text-white md:text-center md:text-lg md:p-4">© 2024 Silver Era Transition. All rights reserved.</p>
    </div>
</footer>



    </div>
  );
}

export default LandingPage;
