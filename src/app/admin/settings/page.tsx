"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define types for permissions, resources, roles, and new role
type Permission = "read" | "view" | "edit" | "remove";
type Resource =
  | "Users"
  | "Courses"
  | "Classes"
  | "Students"
  | "Teachers"
  | "Reports"
  | "Settings";

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Record<Resource, Permission[]>;
}

interface NewRole {
  name: string;
  description: string;
  permissions: Partial<Record<Resource, Permission[]>>;
}

const RBACManagement: React.FC = () => {
  // List of resources in the system
  const resources: Resource[] = [
    "Users",
    "Courses",
    "Classes",
    "Students",
    "Teachers",
    "Reports",
    "Settings",
  ];

  // List of permissions
  const permissions: Permission[] = ["read", "view", "edit", "remove"];

  // State for roles list
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "Admin",
      description: "Quản trị viên hệ thống",
      permissions: {
        Users: ["read", "view", "edit", "remove"],
        Courses: ["read", "view", "edit", "remove"],
        Classes: ["read", "view", "edit", "remove"],
        Students: ["read", "view", "edit", "remove"],
        Teachers: ["read", "view", "edit", "remove"],
        Reports: ["read", "view", "edit", "remove"],
        Settings: ["read", "view", "edit", "remove"],
      },
    },
    {
      id: 2,
      name: "Teacher",
      description: "Giáo viên",
      permissions: {
        Users: ["read", "view", "edit", "remove"],
        Courses: ["read", "view", "edit", "remove"],
        Classes: ["read", "view", "edit", "remove"],
        Students: ["read", "view", "edit", "remove"],
        Teachers: ["read", "view", "edit", "remove"],
        Reports: ["read", "view", "edit", "remove"],
        Settings: ["read", "view", "edit", "remove"],
      },
    },
  ]);

  // State for adding a new role
  const [newRole, setNewRole] = useState<NewRole>({
    name: "",
    description: "",
    permissions: {},
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Check if a role has a specific permission on a resource
  const hasPermission = (
    role: Role,
    resource: Resource,
    permission: Permission
  ): boolean => {
    return role.permissions[resource]?.includes(permission) || false;
  };

  // Handle permission changes
  const handlePermissionChange = (
    role: Role,
    resource: Resource,
    permission: Permission,
    checked: boolean
  ) => {
    const updatedRoles = roles.map((r) => {
      if (r.id === role.id) {
        const updatedPermissions = { ...r.permissions };
        if (!updatedPermissions[resource]) {
          updatedPermissions[resource] = [];
        }
        if (checked) {
          updatedPermissions[resource] = [
            ...new Set([...updatedPermissions[resource], permission]),
          ];
        } else {
          updatedPermissions[resource] = updatedPermissions[resource].filter(
            (p) => p !== permission
          );
        }
        return { ...r, permissions: updatedPermissions };
      }
      return r;
    });
    setRoles(updatedRoles);
  };

  // Handle adding a new role
  const handleAddRole = () => {
    if (newRole.name) {
      setRoles([
        ...roles,
        {
          id: roles.length + 1,
          ...newRole,
          permissions: {},
        } as Role,
      ]);
      setNewRole({
        name: "",
        description: "",
        permissions: {},
      });
      setIsAddDialogOpen(false);
    }
  };

  // Handle deleting a role
  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-darkgreen font-bold">
          Quản lý Phân quyền
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex bg-darkgreen text-white items-center gap-2">
              <Shield size={16} />
              Thêm Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm Role mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Input
                  placeholder="Tên role"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  placeholder="Mô tả"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleAddRole}>Thêm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {roles.map((role) => (
        <div key={role.id} className="mb-8 border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl text-darkgreen font-semibold">
                {role.name}
              </h2>
              <p className="text-sm text-gray-500">{role.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Pencil size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteRole(role.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                {permissions.map((permission) => (
                  <TableHead key={permission}>
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource}>
                  <TableCell className="font-medium">{resource}</TableCell>
                  {permissions.map((permission) => (
                    <TableCell key={permission}>
                      <Checkbox
                        checked={hasPermission(role, resource, permission)}
                        onCheckedChange={(checked) =>
                          handlePermissionChange(
                            role,
                            resource,
                            permission,
                            checked as boolean
                          )
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default RBACManagement;
