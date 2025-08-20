import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
const Dialogbox = () => {
  return (
    <div>
        <Dialog>
            <DialogTrigger>
                   <Button className='mt-2 bg-purple-500 hover:bg-purple-400'>Start consultation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>say your problems</DialogTitle>
                <DialogDescription>
                   <div>
                    <h2>Add symptoms</h2>
                    <Textarea placeholder='add details here...' className='h-[200px] mt-1'></Textarea>
                   </div>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>

                    <Button variant={'outline'}>cancel</Button>
                    </DialogClose>
                    <Button>next</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default Dialogbox
