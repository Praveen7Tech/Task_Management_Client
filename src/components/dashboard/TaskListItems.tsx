import { format } from "date-fns";
import { Calendar, Flag, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { type Task } from "../custom/TaskDialog";

const priorityConfig = {
  high: { label: "High", className: "bg-destructive/10 text-destructive border-destructive/20" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning-foreground border-warning/20" },
  low: { label: "Low", className: "bg-success/10 text-success border-success/20" },
};

interface Props {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskListItem = ({ task, index, onEdit, onDelete }: Props) => {
  const isCompleted = task.status === "completed";

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex gap-4 items-start hover:shadow-sm transition-shadow">
      <div className="text-sm font-semibold text-muted-foreground w-6">
        {index}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-medium ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
          {task.title}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5 truncate">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-2.5">
          <Badge variant="outline" className={priorityConfig[task.priority as keyof typeof priorityConfig].className}>
            <Flag className="w-3 h-3 mr-1" /> {priorityConfig[task.priority as keyof typeof priorityConfig].label}
          </Badge>

          <Badge variant="outline" className="text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(task.dueDate), "dd MMM yyyy")}
          </Badge>

          <Badge className={isCompleted ? "bg-success/10 text-success" : "bg-warning/10 text-warning-foreground"}>
            {isCompleted ? "Completed" : "Pending"}
          </Badge>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(task)}>
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(task)} className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
