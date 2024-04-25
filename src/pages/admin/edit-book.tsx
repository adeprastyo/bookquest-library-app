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
import { getDetailBook } from "@/utils/apis/books/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// interface Props {
//   id: number;
//   selectedBook: (book: IBook | null) => void;
// }

interface Props {
  id: number;
}

function EditBook(props: Props) {
  // const { id, selectedBook } = props;
  const { id } = props;

  // const [data, setData] = useState<IBook>([]);
  const [title, setTitle] = useState("");
  // const [feature, setFeature] = useState(true);
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);

  // const [coverImage, setCoverImage] = useState("");

  // useEffect(() => {
  //   if (selectedBook) {
  //     fetchData();
  //   }
  // }, [selectedBook]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { payload } = await getDetailBook(`${id}`);

      // setData(payload);
      setTitle(payload.title);
      setAuthor(payload.author);
      setIsbn(payload.isbn);
      setCategory(payload.category);
      setDesc(payload.description);
      // setCoverImage(payload.cover_image);
    } catch (error) {
      toast((error as Error).message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-600 hover:bg-yellow-700">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white border-slate-500">
        <form>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update your book here</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                className="col-span-3 bg-slate-600 text-white"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Author
              </Label>
              <Input
                id="author"
                value={author}
                className="col-span-3 bg-slate-600 text-white"
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                ISBN
              </Label>
              <Input
                id="isbn"
                value={isbn}
                className="col-span-3 bg-slate-600 text-white"
                onChange={(e) => {
                  setIsbn(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Category
              </Label>
              <select
                className="w-[180px] bg-slate-600 text-white px-2 py-1 border border-slate-300"
                name="category"
                id="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
              >
                <option value="-">Select a Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Self-development">Self Development</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deskripsi" className="text-right">
                Deskripsi
              </Label>
              <textarea
                id="deskripsi"
                value={desc}
                className="min-h-[100px]  p-3 col-span-3 bg-slate-600 text-white rounded-md border border-white"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Cover Image
              </Label>
              <Input
                type="file"
                id="cover-image"
                value=""
                className="col-span-3 bg-slate-600 text-white"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-white text-black">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditBook;
