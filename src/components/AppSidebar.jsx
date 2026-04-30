// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// const items = [
//   { title: "Dashboard", url: "#" },
//   { title: "Courses", url: "#" },
//   { title: "Grades", url: "#" },
//   { title: "Settings", url: "#" },
// ];

// export default function AppSidebar() {
//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>GradeFinder</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarClose, SidebarCloseIcon } from "lucide-react";

export default function AppSidebar({
  courses,
  courseIndex,
  setCourseIndex,
  setCourses,
  addCourse,
  deleteCourse,
}) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Courses</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* {courses.map((course, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton
                    onClick={() => setCourseIndex(i)}
                    className={i === courseIndex ? "bg-muted" : ""}
                  >
                    {course.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
              {courses.map((course, i) => (
                <SidebarMenuItem key={i}>
                  <div className="flex items-center">
                    <SidebarMenuButton
                      onClick={() => setCourseIndex(i)}
                      className={`flex-1 justify-start ${
                        i === courseIndex ? "bg-muted" : ""
                      }`}
                    >
                      <span className="truncate">{course.name}</span>
                    </SidebarMenuButton>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCourse(i);
                      }}
                      className="ml-1 rounded px-2 py-1 text-sm hover:bg-muted"
                      aria-label={`Delete ${course.name}`}
                    >
                      ×
                    </button>
                  </div>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton onClick={addCourse}>
                  + Add Course
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
