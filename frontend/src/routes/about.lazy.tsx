import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import AboutCard from '@/components/webshop/AboutCard'
import WebshopNavbar from '@/components/webshop/WebshopNavbar'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export const Route = createLazyFileRoute('/about')({
  component: About
})

function About() {
    const { toast } = useToast()

    const handleCopy = (e: any) => {
        navigator.clipboard.writeText(e.target.innerText)
        toast({
            description: "Copied to clipboard!",
            duration: 2000,
        })
    }

    return (
        <>
            <WebshopNavbar />
            <main className='w-full min-h-[95dvh] font-geist pt-[5rem] px-5'>
                <section className='w-full flex flex-col sm:flex-row justify-between items-center gap-2'>
                    <section className='w-[85%] sm:w-[45%]'>
                        <h1 className='text-[2.5rem] font-bold mt-5'>About us</h1>
                        <p className='text-gray-500 mt-2 w-[95%] sm:w-[80%] md:w-[65%]'>We are a webshop that sells all kinds of electronic products and accessories, whether it's a laptop, a phone, a gaming console or a computer.</p>
                        <div>
                            <h3 className='font-bold mt-4 mb-2'>You can find our social media accounts here:</h3>
                            <div className='flex h-5 gap-2'>
                                <Link className='underline text-gray-500'>Facebook</Link>
                                <Separator orientation="vertical" />
                                <Link className='underline text-gray-500'>Instagram</Link>
                                <Separator orientation="vertical" />
                                <Link className='underline text-gray-500'>YouTube</Link>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h4 className='font-bold'>Additional information about our company:</h4>
                            <p className='text-gray-500 mt-2'>Our company was founded in 2022. We are based in Hungary.</p>
                            <p className='text-gray-500 mt-1 w-[95%] sm:w-[80%] md:w-[65%]'>We are a team of 5. We are specialized in web and software development and we are enthusiastic about tech. With a lot of experience in the industry.</p>
                        </div>
                    </section>
                    <section className='w-[85%] sm:w-[45%]'>
                        <h1 className='text-[2.5rem] font-bold mt-5 mb-3 text-right'>Our team</h1>
                        <div className='flex flex-col gap-3'>
                            <AboutCard name="János Csordás" description="CEO and founder of Ryan Webshop. Software Developer and Web Designer." />
                            <AboutCard name="Jane Doe" description="Computer enthusiast, Web Designer and Graphics Designer." />
                            <AboutCard name="Some One" description="Software and Web Developer." />
                            <AboutCard name="Ryan Gosling" description="Famous Actor and Tech enthusiast." />
                            <AboutCard name="John Doe" description="Knows everything about tech." />
                        </div>
                    </section>
                </section>
                <section className='w-full my-10'>
                    <h1 className='text-[2rem] font-bold text-center'>Ask us</h1>
                    <p className='text-gray-500 text-center'>If you have any questions, please don't hesitate to contact us.</p>
                    <p className='text-gray-500 text-center'>E-mail: <span className='text-gray-400 hover:underline cursor-pointer' onClick={handleCopy}>pQb7T@example.com</span></p>
                    <p className='text-gray-500 text-center'>Mobile number: <span className='text-gray-400 hover:underline cursor-pointer' onClick={handleCopy}>+36 20 123 4567</span></p>
                </section>
                <section className='w-full mb-10'>
                    <h1 className='text-[1.75rem] font-bold text-center mb-2'>FAQ - Frequently Asked Questions</h1>
                    <Accordion type="single" collapsible className='w-[75%] sm:w-[65%] md:w-1/2 mx-auto'>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Are the prices include VAT?</AccordionTrigger>
                            <AccordionContent>
                            Yes, even better. The price includes shipping costs too!
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How much time does it take to deliver?</AccordionTrigger>
                            <AccordionContent>
                            It depends on your country. In Hungary it takes around 1-3 working days.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Are you prebuilding PCs?</AccordionTrigger>
                            <AccordionContent>
                            Yes, we do. We build all kinds of computers. You can customize it however you want.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </main>
            <footer className='w-full h-[2rem] text-center'>
                <p className='text-gray-500'>Copyright &copy; {new Date().getFullYear()} Ryan Webshop. All rights reserved.</p>
            </footer>
        </>
    )
}
