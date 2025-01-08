package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"flowtaks/internal/models"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type ReportHandler struct {
	DB *gorm.DB
}

func NewReportHandler(db *gorm.DB) *ReportHandler {
	return &ReportHandler{DB: db}
}

// CreateReport membuat laporan baru
func (h *ReportHandler) CreateReport(w http.ResponseWriter, r *http.Request) {
	var report models.Report
	if err := json.NewDecoder(r.Body).Decode(&report); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Ambil userID dari context (setelah authentication)
	userID := r.Context().Value("userID").(uint)
	report.UserID = userID

	if err := h.DB.Create(&report).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(report)
}

// GetReports mengambil semua laporan dengan filter bulan
func (h *ReportHandler) GetReports(w http.ResponseWriter, r *http.Request) {
	month := r.URL.Query().Get("month")
	year := r.URL.Query().Get("year")

	var reports []models.Report
	query := h.DB.Preload("User")

	if month != "" && year != "" {
		monthInt, _ := strconv.Atoi(month)
		yearInt, _ := strconv.Atoi(year)
		startDate := time.Date(yearInt, time.Month(monthInt), 1, 0, 0, 0, 0, time.UTC)
		endDate := startDate.AddDate(0, 1, 0)

		query = query.Where("created_at BETWEEN ? AND ?", startDate, endDate)
	}

	if err := query.Find(&reports).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(reports)
}

// GetReport mengambil satu laporan berdasarkan ID
func (h *ReportHandler) GetReport(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var report models.Report
	if err := h.DB.Preload("User").First(&report, id).Error; err != nil {
		http.Error(w, "Report not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(report)
}

// UpdateReport memperbarui laporan
func (h *ReportHandler) UpdateReport(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var report models.Report
	if err := h.DB.First(&report, id).Error; err != nil {
		http.Error(w, "Report not found", http.StatusNotFound)
		return
	}

	// Verifikasi pemilik laporan
	userID := r.Context().Value("userID").(uint)
	if report.UserID != userID {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var updatedReport models.Report
	if err := json.NewDecoder(r.Body).Decode(&updatedReport); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	report.Title = updatedReport.Title
	report.Content = updatedReport.Content

	if err := h.DB.Save(&report).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(report)
}

// DeleteReport menghapus laporan
func (h *ReportHandler) DeleteReport(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var report models.Report
	if err := h.DB.First(&report, id).Error; err != nil {
		http.Error(w, "Report not found", http.StatusNotFound)
		return
	}

	// Verifikasi pemilik laporan
	userID := r.Context().Value("userID").(uint)
	if report.UserID != userID {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	if err := h.DB.Delete(&report).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
