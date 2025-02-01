package com.example.thymleafexamples.controller;

import com.example.thymleafexamples.domain.enums.ReasonCategory;
import com.example.thymleafexamples.domain.enums.RecordType;
import com.example.thymleafexamples.domain.enums.SituationType;
import com.example.thymleafexamples.domain.enums.SolutionCategory;
import com.example.thymleafexamples.dto.WorkOrderDTO;
import com.example.thymleafexamples.service.WorkOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/workorders")
public class WorkOrderController {

    @Autowired
    private WorkOrderService workOrderService;

    // Tüm iş emirlerini sayfalı olarak listeleme
    @GetMapping
    public String listWorkOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Model model) {
        Page<WorkOrderDTO> workOrderPage = workOrderService.getAllWorkOrders(page, size);
        model.addAttribute("workOrders", workOrderPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", workOrderPage.getTotalPages());
        return "workorders/list";
    }

    // Yeni iş emri ekleme formunu gösterme
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("workOrderDTO", new WorkOrderDTO());
        addEnumsToModel(model);
        return "workorders/add";
    }

    // Yeni iş emri ekleme
    @PostMapping("/add")
    public String addWorkOrder(@ModelAttribute WorkOrderDTO workOrderDTO, RedirectAttributes redirectAttributes) {
        workOrderService.createWorkOrder(workOrderDTO);
        redirectAttributes.addFlashAttribute("message", "Work order added successfully!");
        return "redirect:/workorders";
    }

    // İş emri düzenleme formunu gösterme
    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        WorkOrderDTO workOrderDTO = workOrderService.getWorkOrderById(id);
        model.addAttribute("workOrderDTO", workOrderDTO);
        addEnumsToModel(model);
        return "workorders/edit";
    }

    // İş emri düzenleme
    @PostMapping("/edit/{id}")
    public String editWorkOrder(@PathVariable Long id, @ModelAttribute WorkOrderDTO workOrderDTO, RedirectAttributes redirectAttributes) {
        workOrderService.updateWorkOrder(id, workOrderDTO);
        redirectAttributes.addFlashAttribute("message", "Work order updated successfully!");
        return "redirect:/workorders";
    }

    // İş emri silme onay sayfasını gösterme
    @GetMapping("/delete/{id}")
    public String showDeleteForm(@PathVariable Long id, Model model) {
        WorkOrderDTO workOrderDTO = workOrderService.getWorkOrderById(id);
        model.addAttribute("workOrderDTO", workOrderDTO);
        return "workorders/delete";
    }

    // İş emri silme
    @PostMapping("/delete/{id}")
    public String deleteWorkOrder(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        workOrderService.deleteWorkOrder(id);
        redirectAttributes.addFlashAttribute("message", "Work order deleted successfully!");
        return "redirect:/workorders";
    }

    // Enum değerlerini model'e ekleme
    private void addEnumsToModel(Model model) {
        model.addAttribute("recordTypes", RecordType.values());
        model.addAttribute("situationTypes", SituationType.values());
        model.addAttribute("reasonCategories", ReasonCategory.values());
        model.addAttribute("solutionCategories", SolutionCategory.values());
    }
}