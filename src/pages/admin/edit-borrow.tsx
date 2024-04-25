import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function EditBorrow() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-600 hover:bg-yellow-700">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white border-slate-500">
        <DialogHeader>
          <DialogTitle>Edit Borrow</DialogTitle>
          <DialogDescription>Update your book here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              User
            </Label>
            <Input
              id="user"
              value=""
              className="col-span-3 bg-slate-600 text-white"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Book
            </Label>
            <Input
              id="book"
              value=""
              className="col-span-3 bg-slate-600 text-white"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Borrow Date
            </Label>
            <Input
              type="date"
              id="borrow-date"
              value=""
              className="col-span-3 bg-slate-600 text-white"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Due Date
            </Label>
            <Input
              type="date"
              id="due-date"
              value=""
              className="col-span-3 bg-slate-600 text-white"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Return Date
            </Label>
            <Input
              type="date"
              id="return-date"
              value=""
              className="col-span-3 bg-slate-600 text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-white text-black">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBorrow;
